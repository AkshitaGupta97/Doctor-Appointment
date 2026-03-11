import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/AppointmentModel.js';


// api to register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        // evaluation of email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        // password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // add user to database
        const userData = new userModel({ name, email, password: hashedPassword });
        await userData.save();
        // for token
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);

        return res.json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// api for user login

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, message: "Login successful", token });

    }
    catch (error) {
        console.error("error from user controller -> ", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// api to get user profile data
export const getProfile = async (req, res) => {
    try {

        const userId = req.userId;

        console.log("UserId from token:", userId);

        const user = await userModel
            .findById(userId)
            .select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.log("getProfile error:", error);
        res.json({
            success: false,
            message: "Internal server error"
        });
    }
};

// api to update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, dob, gender } = req.body || {};
        const userId = req.userId;
        const imageFile = req.file;

        // Parse address fields safely
        const address = {
            line1: req.body["address[line1]"] || "",
            line2: req.body["address[line2]"] || ""
        };

        // Validate only the truly required fields
        if (!name?.trim() || !phone?.trim()) {
            return res.status(400).json({ success: false, message: "Name and phone are required" });
        }

        // Build update object dynamically
        let updateData = { name, phone };

        if (dob) updateData.dob = dob;
        if (gender) updateData.gender = gender;
        if (address.line1 || address.line2) updateData.address = address;

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

       await userModel.findByIdAndUpdate(userId, updateData, { returnDocument: 'after' });

        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// book appointment with the doctor
export const bookAppointment = async (req, res) => {
    try {
        const { slotDate, slotTime, doctorId  } = req.body;
        const userId = req.userId;
        
        if (!doctorId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const docData = await doctorModel.findById(doctorId).select('-password');

        if(!docData.available){
            return res.json({ success: false, message: "Doctor is Unavailable" });
        }

        let slots_booked = docData.slots_booked;

        // check slot availability,
        // as if in slot Date if time is already booked then you cannot book 
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({ success: false, message: "Slot is Unavailable" });
            }
            else {  // it time is not included  then you book time
                slots_booked[slotDate].push(slotTime);
            }
        }
        // else slotDate is not booked, means on that particular date  one has booked then you may book appointment
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked; // we are removing because, when we save our appointment , then we save docData and we don't want the history of slotsBooked

        const appointmentData = {
            userId, doctorId, userData, docData, amount:docData.fees, slotTime, slotDate, date:Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in doctor data

        await doctorModel.findByIdAndUpdate(doctorId, {slots_booked});

        res.json({success:true, message: "Appointment Booked."});

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


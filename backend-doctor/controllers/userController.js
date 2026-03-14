import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/AppointmentModel.js';
import Razorpay from "razorpay";

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

        //   console.log("UserId from token:", userId);

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

// get online payment method....


// api to get user appointments for frontend my appointment page

export const listAppointment = async (req, res) => {
    try {
        // ✅ userId should come from auth middleware (decoded JWT)
        const userId = req.userId;

        // ✅ use find, not findById
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// api to cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId; // comes from JWT middleware
        const { appointmentId } = req.body;

        // find appointment by its _id
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // verify appointment belongs to user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // mark appointment as cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // release doctor slot
        const { doctorId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(doctorId);
        let slots_booked = doctorData.slots_booked || {};

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
        }

        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

        res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// RAZOR PAY payment method

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment cancelled or not found"
            });
        }
        console.log("Appointment:", appointmentData);
        const options = {
            amount: appointmentData.amount * 100,
            currency: "INR",
            receipt: appointmentId,
            notes: {
                appointmentId: appointmentId
            }
        };
        const order = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            order
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// book appointment with the doctor
export const bookAppointment = async (req, res) => {
    try {
        const { slotDate, slotTime, doctorId } = req.body;
        const userId = req.userId;

        if (!doctorId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Fetch doctor data
        const docData = await doctorModel.findById(doctorId).select("-password");
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is Unavailable" });
        }

        let slots_booked = docData.slots_booked || {};

        // Check slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is Unavailable" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Fetch user data
        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Strip out slots_booked before saving doctorData into appointment
        const { slots_booked: _, ...doctorData } = docData.toObject();

        // Build appointment object
        const appointmentData = {
            userId,
            doctorId,
            userData,
            doctorData, // ✅ matches schema
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        // Save appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update doctor slots
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked." });
    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**is using JavaScript object destructuring with a little trick:
- docData.toObject() converts the Mongoose document into a plain JavaScript object.
(Mongoose documents have extra methods and metadata; converting them makes it easier to manipulate.)
- { slots_booked: _, ...doctorData } means:
- Take the property slots_booked out of the object and assign it to a variable named _ (we don’t actually use it, so _ is just a throwaway).
- Collect all the remaining properties into a new object called doctorData.
So effectively, this line removes the slots_booked field from the doctor object and keeps everything else in doctorData.
{
  _id: "123",
  name: "Dr. Sharma",
  speciality: "Cardiology",
  fees: 500,
  slots_booked: { "12_3_2026": ["10:00 AM"] }
} after destructuring becomes
  doctorData = {
  _id: "123",
  name: "Dr. Sharma",
  speciality: "Cardiology",
  fees: 500
}
 */

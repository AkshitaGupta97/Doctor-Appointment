import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// api for adding doctor
export const addDoctor = async(req, res) => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;
        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.status(400).json({success: false, message: "All details are required.."});
        }
        // validating email
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: "Enter valid email.."});
        }
        // validating password
        if(password.length < 8){
            return res.json({success: false, message: "Enter a strong password.."});
        }
        // ecrypt password by bcrypt using hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("req.file =", req.file);
        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl =imageUpload.secure_url;
        //save data to database, JSON.parse(address), convert address to json format
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (parseError) {
            return res.status(400).json({success: false, message: "Invalid address format. Must be valid JSON."});
        }
        const doctorData = {
            name, email, degree, speciality, experience, about, fees,  
            image:imageUrl, password:hashedPassword, address:parsedAddress, date: Date.now()
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message:"Doctor added."})

    } catch (error) {
        console.log("error from admin -> addDoctor = ", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

// api for admin login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All details are required.." });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },                // payload must be object
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        message: "Login successful..",
        token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials.." });
    }
  } catch (error) {
    console.log("error from admin -> adminLogin =", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


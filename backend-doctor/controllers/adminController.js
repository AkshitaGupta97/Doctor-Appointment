import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';

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



import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// to change availability of doctor
export const changeAvailability = async (req, res) => {
    try {
        const {doctorId} = req.body;
        const doctor = await doctorModel.findById(doctorId);
        await doctorModel.findByIdAndUpdate(doctorId, {available: !doctor.available});
        res.json({success: true, message: "Availability updated successfully"})
    } catch (error) {
        console.log("error from doctor -> changeAvailability = ", error);
        res.json({success: false, message: "Internal server error"})
    }
}

// get doctor list
export const getDoctorList = async(req, res) => {
    try {
        const doctors = await doctorModel.find({available: true}).select(['-password', '-email']);

        res.json({success: true, doctors});

    } catch (error) {
        console.log("error from doctor -> getDoctorList = ", error);
        res.json({success: false, message: error.message})
    }
}

// api for doctor login
export const loginDoctor = async(req, res) => {
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false, message: "Invalid credentials.."});
        }
        // check for password
        const isMatch = await  bcrypt.compare(password, doctor.password);
        if(isMatch){
            const token = jwt.sign({id: doctor._d}, process.env.JWT_SECRET);
            res.json({success: true, token});
        }
        else {
            return res.json({success:false, message: "Invalid credentials.."});
        }

    } catch (error) {
        console.log("error from doctor -> loginDoctor = ", error);
        res.json({success: false, message: error.message})
    }
}

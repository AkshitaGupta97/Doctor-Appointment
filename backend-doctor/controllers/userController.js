import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

export const loginUser = async(req, res) => {
    try {

        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message: "Incorrect password"});
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.json({success:true, message: "Login successful", token});

    } 
    catch (error) {
        console.error("error from user controller -> ",error);
        return res.json({success: false, message:"Internal server error"});
    }
}

// api to get user profile data
export const getProfile = async(req, res) => {
    try {
        const {userId} = req.body; // we get user id by token as user will send the token
        const user = await userModel.findById(userId).select("-password"); // we don't want to send password to frontend
        if(!user){
            return res.json({success:false, message: "User not found"});
        }
        res.json({success:true, user});

    } catch (error) {
        console.error("error from user controller -> ",error);
        return res.json({success: false, message:"Internal server error"});
    }
}



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    image: {type: String, default: "https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"},
    address: {type: Object, default: {line1:"", line2:""}},
    gender: {type: String, default: "Not Selected"},
    dob: {type: String, default: "Not Selected"},
    phone: {type: String, default: "9100000009"},
}); 

const userModel = mongoose.model('doctor', userSchema);

export default userModel;

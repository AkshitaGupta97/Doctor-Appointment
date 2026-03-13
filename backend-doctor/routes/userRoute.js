import express from 'express';
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateUserProfile } from '../controllers/userController.js';
import { authUser } from '../middleware/AuthUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser,  getProfile);
userRouter.post("/update-profile",authUser,upload.single("image"),updateUserProfile); // use auth befor upload because it passes value to db
userRouter.post('/book-appointment', authUser,  bookAppointment);
userRouter.get('/appointments',authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment );
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);

export default userRouter;

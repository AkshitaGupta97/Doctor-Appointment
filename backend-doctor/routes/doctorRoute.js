import express from 'express';
import { appointmentCancelled, appointmentComplete, appointmentDoctor, doctorDashboard, doctorProfile, getDoctorList, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js';
import { authDoctor } from '../middleware/AuthDoctor.js';

const doctorRouter = express.Router();

doctorRouter.post('/doctor-list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointment', authDoctor, appointmentDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancelled);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);

export default doctorRouter;

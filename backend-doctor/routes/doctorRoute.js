import express from 'express';
import { appointmentDoctor, getDoctorList, loginDoctor } from '../controllers/doctorController.js';
import { authDoctor } from '../middleware/AuthDoctor.js';

const doctorRouter = express.Router();

doctorRouter.post('/doctor-list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointment', authDoctor, appointmentDoctor);

export default doctorRouter;

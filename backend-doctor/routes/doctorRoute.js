import express from 'express';
import { getDoctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.post('/doctor-list', getDoctorList);

export default doctorRouter;

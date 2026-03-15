import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/AppointmentModel.js";

// to change availability of doctor
export const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const doctor = await doctorModel.findById(doctorId);
        await doctorModel.findByIdAndUpdate(doctorId, { available: !doctor.available });
        res.json({ success: true, message: "Availability updated successfully" })
    } catch (error) {
        console.log("error from doctor -> changeAvailability = ", error);
        res.json({ success: false, message: "Internal server error" })
    }
}

// get doctor list
export const getDoctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ available: true }).select(['-password', '-email']);

        res.json({ success: true, doctors });

    } catch (error) {
        console.log("error from doctor -> getDoctorList = ", error);
        res.json({ success: false, message: error.message })
    }
}

// api for doctor login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials.." });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            return res.json({ success: false, message: "Invalid credentials.." });
        }

    } catch (error) {
        console.log("error from doctor -> loginDoctor = ", error);
        res.json({ success: false, message: error.message });
    }
}

// get doctor appointment for doctor panel
export const appointmentDoctor = async (req, res) => {
    try {
        const doctorId = req.docId;
        const appointments = await appointmentModel.find({ doctorId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log("error from doctor -> appointmentDoctor = ", error);
        res.json({ success: false, message: error.message })
    }
}

// api to mark appointment completed

export const appointmentComplete = async (req, res) => {
    try {

        const doctorId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId.toString() === doctorId) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { isCompleted: true }
            );

            return res.json({ success: true, message: "Appointment completed" });

        } else {
            return res.json({ success: false, message: "Update failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to cancel appointment cancelled

export const appointmentCancelled = async (req, res) => {
    try {

        const doctorId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId.toString() === doctorId) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { cancelled: true }
            );

            return res.json({ success: true, message: "Appointment cancelled" });

        } else {
            return res.json({ success: false, message: "Cancellation failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to get dashboard data for doctor panel
export const doctorDashboard = async(req, res) => {
    try {
        const doctorId = req.docId;
        const appointment = await appointmentModel.find({doctorId});

        let earnings = 0
        appointment.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        });

        let patients = [];
        appointment.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointment: appointment.length,
            patients: patients.length,
            latestAppointments: appointment.reverse().slice(0,5)
        }

        res.json({success:true, dashData});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to get Docoter profile for doctor
export const doctorProfile = async(req, res) => {
    try {
        const doctorId = req.docId;
        const profileData = await doctorModel.findById(doctorId).select('-password');

        res.json({success: true, profileData});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to update doctor profile

export const updateDoctorProfile = async(req, res) => {
    try {
        const doctorId = req.docId;
        const {fees, address, available} = req.body;

        await doctorModel.findByIdAndUpdate(doctorId, {fees, address, available});

        res.json({success: true, message:"Profile Updated."})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


import doctorModel from "../models/doctorModel.js";

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

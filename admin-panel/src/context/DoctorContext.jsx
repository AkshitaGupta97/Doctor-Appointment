import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);

    // get appointments of doctor
    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/appointment', { headers: { Authorization: `Bearer ${dToken}` } });
            if(data.success){
                setAppointments(data.appointments.reverse());
                console.log("in doctor context", data.appointments);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("error from doctor", error);
            toast.error(error.message);
        }
    }

    const value = {
        dToken, setDtoken, backendUrl, appointments, getAppointments,
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

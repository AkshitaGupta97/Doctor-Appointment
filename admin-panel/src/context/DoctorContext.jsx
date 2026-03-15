import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear()
        return age;
    }

    const months = ['', 'Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }

    // get appointments of doctor
    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctors/appointment', { headers: { Authorization: `Bearer ${dToken}` } });
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

    // mark appointment complete
    

    const value = {
        dToken, setDtoken, backendUrl, appointments, getAppointments, calculateAge,  slotDateFormat,

    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

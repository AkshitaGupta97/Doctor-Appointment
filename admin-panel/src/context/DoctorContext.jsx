import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

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
            const { data } = await axios.get(backendUrl + '/api/doctors/appointment', { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                setAppointments(data.appointments);
               // console.log("in doctor context", data.appointments);
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
    const completeAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(
                backendUrl + '/api/doctors/complete-appointment',
                { appointmentId },
                { headers: { Authorization: `Bearer ${dToken}` } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("error from doctor", error);
            toast.error(error.message);
        }
    };

    // mark appointment cancel
    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(
                backendUrl + "/api/doctors/cancel-appointment", { appointmentId },
                {headers: { Authorization: `Bearer ${dToken}` }}
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("error from doctor", error);
            toast.error(error.message);
        }
    };

    // get dashboard data
    const getDashData = async() => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctors/dashboard', {headers: { Authorization: `Bearer ${dToken}` }} );
            if(data.success){
                setDashData(data.dashData);
               // console.log("dash data => ", data.dashData);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error from doctor", error);
            toast.error(error.message);
        }
    }

    // get profile data
    const getProfileData = async() => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctors/profile', {headers: {Authorization: `Bearer ${dToken}`}});
            if(data.success){
                setProfileData(data.profileData);
              //  console.log("profile data => ", data.profileData);
            }
        } catch (error) {
            console.log("error from doctor", error);
            toast.error(error.message);
        }
    }


    const value = {
        dToken, setDtoken, backendUrl, appointments, getAppointments, calculateAge, slotDateFormat,
        cancelAppointment, completeAppointment, getDashData, dashData, setDashData,
        profileData, setProfileData, getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

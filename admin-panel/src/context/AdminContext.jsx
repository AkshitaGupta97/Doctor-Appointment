import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adToken, setAdToken] = useState(localStorage.getItem('adToken') ? localStorage.getItem('adToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // get all doctor list from backend.
    const getAllDoctorList = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { Authorization: `Bearer ${adToken}` } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while fetching doctors list");
        }
    }

    // change availability of doctor
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { doctorId: docId }, { headers: { Authorization: `Bearer ${adToken}` } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctorList(); // Refresh the doctor list to reflect the availability change
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    // get all appointments
    const getAllAppointments = async () => {
        try {

            const { data } = await axios.get(
                backendUrl + "/api/admin/appointments",
                { headers: { Authorization: `Bearer ${adToken}` } }
            );

            if (data.success) {
                setAppointments(data.appointments);
               // console.log("Appointm - admin -", data.appointments);
                
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // cancel appointment
    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment', {appointmentId}, { headers: { Authorization: `Bearer ${adToken}` } } );
            if(data.success){
                toast.success(data.message);
                getAllAppointments()
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error from admin ", error);
            toast.error(error.message);
        }
    }

    // get dashboard data
    const getDashData = async() => {
        try {
            const {data} = axios.get(backendUrl+'/api/admin/dashboard', { headers: { Authorization: `Bearer ${adToken}` } } );
            if(data.success){
                setDashData(data.dashData);
                console.log("Admin context -> ", data.dashData);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error from admin ", error);
            toast.error(error.message);
        }
    }

    const value = {
        adToken, setAdToken, backendUrl, doctors, setDoctors, getAllDoctorList, changeAvailability,
        appointments, setAppointments, getAllAppointments, cancelAppointment,
        dashData, getDashData,
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


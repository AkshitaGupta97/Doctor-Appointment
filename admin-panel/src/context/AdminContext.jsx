import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adToken, setAdToken] = useState(localStorage.getItem('adToken') ? localStorage.getItem('adToken') : '');
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // get all doctor list from backend.
    const getAllDoctorList = async() => {
        try {
           const {data} =  await axios.post(`${backendUrl}/api/admin/all-doctors`, {} , {headers : {Authorization : `Bearer ${adToken}`} });
           if(data.success){
            setDoctors(data.doctors);
            console.log(data.doctors);
           }
           else{
            toast.error(data.message);
           }
        } catch (error) {
            toast.error("Something went wrong while fetching doctors list");
        }
    }

    // change availability of doctor
    const changeAvailability = async(docId) => {
        try{
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`, {doctorId: docId}, {headers : {Authorization : `Bearer ${adToken}`} });
            if(data.success){
                toast.success(data.message);
                getAllDoctorList(); // Refresh the doctor list to reflect the availability change
            }
            else{
                toast.error(data.message);
            }
        }
        catch (error){
            toast.error(error.message);
        }
    }

    const value = {
        adToken, setAdToken, backendUrl, doctors, setDoctors, getAllDoctorList, changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


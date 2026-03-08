import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adToken, setAdToken] = useState(localStorage.getItem('adToken') ? localStorage.getItem('adToken') : '');
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctorList = async() => {
        try {
           const {data} =  await axios.post(`${backendUrl}/api/admin/all-doctors`, {} , {headers : {Authorization : `Bearer ${adToken}`} });
           if(data.success){
            setDoctors(data.doctors);
           }
           else{
            toast.error(data.message);
           }
        } catch (error) {
            toast.error(data.message);
        }
    }

    const value = {
        adToken, setAdToken, backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


import { createContext, useEffect, useState } from "react";
//import { doctors } from "../assets/myassets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctors/doctor-list`);
            console.log("doctors from app context", data);
            if (data.success) {
                setDoctors(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error from app context", error);
            toast.error("Failed to fetch doctors")
        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(
                backendUrl + "/api/user/get-profile",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (data.success) {
                setUserData({
                    ...data.user,
                    address: data.user.address || { line1: "", line2: "" }
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDoctors()
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
        else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        doctors, getAllDoctors,
        backendUrl, token, setToken, userData, setUserData, loadUserProfileData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

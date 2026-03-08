import { createContext, useEffect, useState } from "react";
//import { doctors } from "../assets/myassets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctors/doctor-list`);
            console.log("doctors from app context", data);
            if(data.success){
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log("error from app context", error)
        }
    }

    useEffect(() => {
        getAllDoctors()
    },[]);

    const value = {
        doctors, 
        backendUrl,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

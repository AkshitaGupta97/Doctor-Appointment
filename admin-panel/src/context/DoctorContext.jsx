import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');

    const value = {
        dToken, setDtoken, backendUrl,
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

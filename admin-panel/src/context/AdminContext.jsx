import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adToken, setAdToken] = useState(localStorage.getItem('adToken') ? localStorage.getItem('adToken') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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


import AdminLogo from "./AdminLogo";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {

    const { adToken, setAdToken } = useContext(AdminContext);
    const { dToken, setDtoken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logoutAdmin = () => {
        navigate('/');
        setAdToken('');
        localStorage.removeItem('adToken');
    };

    const logoutDoctor = () => {
        navigate('/');
        setDtoken('');
        localStorage.removeItem('dToken');
    };

    const handleLogout = () => {
        if (adToken) {
            logoutAdmin();
        } else if (dToken) {
            logoutDoctor();
        }
    };

    return (
        <div className="flex fixed top-0 left-0 w-full justify-between items-center py-4 px-4 sm:px-10 border-b bg-white shadow-lg shadow-gray-400">
            
            <div>
                <AdminLogo />
            </div>

            <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

        </div>
    );
};

export default Navbar;

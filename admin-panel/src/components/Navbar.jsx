import AdminLogo from "./AdminLogo"
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {

    const {adToken} = useContext(AdminContext);

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-10 border-b bg-white shadow-lg shadow-gray-900">
        <div>
            <AdminLogo />
        </div>
        <button className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
    </div>
  )
}

export default Navbar

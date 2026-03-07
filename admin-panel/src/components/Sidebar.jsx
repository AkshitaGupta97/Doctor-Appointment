import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const {adToken} = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-blue-900 border-r border-amber-200 text-white">
        {
            adToken && <ul className="mt-5">
                <NavLink 
                    to='/admin-dashboard' className={({isActive}) => `flex items-center mt-5 gap-3.5 md:px-9 md:min-w-72 py-1.5 cursor-pointer ${isActive ? 'bg-blue-700  border-r border-amber-50' : 'hover:bg-blue-700'}`}>
                    <span className="material-symbols-outlined">home_health</span>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='/all-appointments' className={({isActive}) => `flex items-center mt-5 gap-3.5 md:px-9 py-1.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-700  border-r border-amber-50' : 'hover:bg-blue-700'}`}>
                    <span className="material-symbols-outlined">calendar_add_on</span>
                    <p>Appointment</p>
                </NavLink>
                <NavLink to='/add-doctor' className={({isActive}) => `flex items-center mt-5 gap-3.5 md:px-9 md:min-w-72 py-1.5 cursor-pointer ${isActive ? 'bg-blue-700  border-r border-amber-50' : 'hover:bg-blue-700'}`}>
                    <span className="material-symbols-outlined">add_circle</span>
                    <p>Add Doctor</p>
                </NavLink>
                <NavLink to='/doctor-list' className={({isActive}) => `flex items-center mt-5 gap-3.5 md:px-9 md:min-w-72 py-1.5 cursor-pointer ${isActive ? 'bg-blue-700  border-r border-amber-50' : 'hover:bg-blue-700'}`}>
                    <span className="material-symbols-outlined">list</span>
                    <p>Doctor List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar

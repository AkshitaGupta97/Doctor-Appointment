import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
    const { adToken } = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);

    return (
        <div className={`fixed top-18 left-0 h-[calc(100vh-4rem)] w-64 ${adToken ? 'bg-blue-900' : 'bg-cyan-900'} border-r border-amber-200 text-white`}>
            {/* Admin */}
            {adToken && (
                <ul className="mt-5">

                    <NavLink
                        to='/admin-dashboard'
                        className={({ isActive }) =>
                            `flex items-center gap-3 mt-4 w-full px-6 py-2 cursor-pointer transition-all
                            ${isActive ? 'bg-blue-700 border-r-4 border-amber-300' : 'hover:bg-blue-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">home_health</span>
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink
                        to='/all-appointments'
                        className={({ isActive }) =>
                            `flex items-center gap-3 mt-4 w-full px-6 py-2 cursor-pointer transition-all
                             ${isActive ? 'bg-blue-700 border-r-4 border-amber-300' : 'hover:bg-blue-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">calendar_add_on</span>
                        <p>Appointment</p>
                    </NavLink>

                    <NavLink
                        to='/add-doctor'
                        className={({ isActive }) =>
                            `flex items-center gap-3 mt-4 w-full px-6 py-2 cursor-pointer transition-all
                             ${isActive ? 'bg-blue-700 border-r-4 border-amber-300' : 'hover:bg-blue-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink
                        to='/doctor-list'
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full mt-4 px-6 py-2 cursor-pointer transition-all
                           ${isActive ? 'bg-blue-700 border-r-4 border-amber-300' : 'hover:bg-blue-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">list</span>
                        <p>Doctor List</p>
                    </NavLink>

                </ul>
            )}

                {/* Doctor */}

            {dToken && (
                <ul className="mt-5">

                    <NavLink
                        to='/doctor-dashboard'
                        className={({ isActive }) =>
                            `flex items-center gap-3 mt-4 w-full px-6 py-2 cursor-pointer transition-all
                            ${isActive ? 'bg-cyan-700 border-r-4 border-amber-300' : 'hover:bg-cyan-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">home_health</span>
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink
                        to='/doctor-appointment'
                        className={({ isActive }) =>
                            `flex items-center gap-3 mt-4 w-full px-6 py-2 cursor-pointer transition-all
                             ${isActive ? 'bg-cyan-700 border-r-4 border-amber-300' : 'hover:bg-cyan-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">calendar_add_on</span>
                        <p>Appointment</p>
                    </NavLink>

                    <NavLink
                        to='/doctor-profile'
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full mt-4 px-6 py-2 cursor-pointer transition-all
                           ${isActive ? 'bg-cyan-700 border-r-4 border-amber-300' : 'hover:bg-cyan-700'}`
                        }
                    >
                        <span className="material-symbols-outlined">list</span>
                        <p>Profile</p>
                    </NavLink>

                </ul>
            )}


        </div>
    );
};

export default Sidebar;

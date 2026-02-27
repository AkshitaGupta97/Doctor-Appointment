import { NavLink, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { useState } from "react";

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);


  return (
    <div className="flex items-center justify-between text-md py-4 mb-4 border-b border-gray-600  ">
       <Logo />
       <div>
        <ul className="hidden md:flex items-start gap-5 font-medium">
            <NavLink to='/' >
                <li className="py-1 text-blue-900 ">HOME</li>
                <hr  className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
            </NavLink>
            <NavLink to='/doctors'>
                <li className="py-1 text-blue-900 ">DOCTORS</li>
                <hr  className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
            </NavLink>
            <NavLink to='/about' >
                <li className="py-1 text-blue-900 ">ABOUT</li>
                <hr  className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
            </NavLink>
            <NavLink to='/contact' >
                <li className="py-1 text-blue-900 ">CONTACT</li>
                <hr  className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
            </NavLink>
        </ul>
       </div>

        <div className="flex items-center gap-2">
            {
                token ? <div className="flex items-center justify-center gap-2 group relative">
                    <span className="material-symbols-outlined 
                        text-amber-700 bg-clip-text text-5xl drop-shadow-md  cursor-pointer
                        shadow-lg rounded transition-transform duration-300 hover:scale-110 hover:drop-shadow-xl" style={{fontSize:"36px"}}>
                        account_circle
                    </span>
                    <span className="material-symbols-outlined text-emerald-700 cursor-pointer" style={{fontSize:"32px"}}>arrow_drop_down</span>

                    <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-700 z-20 hidden group-hover:block">
                        <div className="min-w-48 bg-stone-200 rounded flex flex-col cursor-pointer gap-4 p-4">
                            <p onClick={() => navigate('/my-profile')} className="flex items-center justify-center gap-1 hover:text-blue-800"><span className="material-symbols-outlined text-amber-800">switch_account</span> My Profile</p>
                            <p onClick={() => navigate('/my-appointment')} className="flex items-center justify-center gap-1 hover:text-blue-800"><span className="material-symbols-outlined text-amber-800">calendar_add_on</span> Appointments</p>
                            <p onClick={() => setToken(false)} className="flex items-center justify-center gap-1 hover:text-red-600"><span className="material-symbols-outlined text-amber-800">logout</span> Logout</p>
                        </div>
                    </div>

                </div>
                 : <button onClick={() => navigate("/login")} className="bg-blue-800 text-white px-4 py-3 hover:active:scale-95 cursor-pointer rounded-full hidden md:block">
                        Create Account
                    </button>
            }
            
        </div>

    </div>
  )
}

export default Navbar

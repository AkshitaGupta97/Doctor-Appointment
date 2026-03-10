import { NavLink, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token, setToken} = useContext(AppContext);

  return (
    <div className="flex items-center justify-between text-md py-4 mb-4 border-b border-gray-600  ">
      <Logo />
      <div>
        <ul className="hidden md:flex items-start gap-5 font-semibold">
          <NavLink to='/' >
            <li className="py-1 text-amber-800 ">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
          </NavLink>
          <NavLink to='/doctors'>
            <li className="py-1 text-amber-800 ">DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
          </NavLink>
          <NavLink to='/about' >
            <li className="py-1 text-amber-800">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
          </NavLink>
          <NavLink to='/contact' >
            <li className="py-1 text-amber-800">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-gray-600 w-3/5 m-auto hidden " />
          </NavLink>
        </ul>
      </div>

      <div className="flex items-center gap-2">
        {
          token ? <div className="flex items-center justify-center gap-2 group relative">
            <span className="material-symbols-outlined 
                        text-blue-700 bg-clip-text text-5xl drop-shadow-md  cursor-pointer
                        shadow-lg rounded transition-transform duration-300 hover:scale-110 hover:drop-shadow-xl" style={{ fontSize: "36px" }}>
              account_circle
            </span>
            <span className="material-symbols-outlined text-emerald-700 cursor-pointer" style={{ fontSize: "32px" }}>arrow_drop_down</span>

            <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-700 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-200 rounded flex flex-col font-semibold cursor-pointer gap-4 p-4">
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

        <div>
          <p onClick={() => setShowMenu(true)} className="md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </p>
          {/* mobile */}
          <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all  `}>
            <div className="flex items-center justify-between px-4 py-8">
              <Logo />
              <p onClick={() => setShowMenu(false)}><span className="material-symbols-outlined font-bold">close</span></p>
            </div>
            <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg">
              <NavLink onClick={() => setShowMenu(false)} to="/"> <p className="px-4 py-2 rounded  inline-block">Home</p> </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors"> <p className="px-4 py-2 rounded  inline-block">Doctors</p> </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about"> <p className="px-4 py-2 rounded  inline-block">About</p> </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded  inline-block">Contact</p></NavLink>
            </ul>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar

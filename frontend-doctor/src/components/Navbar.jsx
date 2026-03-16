import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between text-md py-4 mb-4 border-b border-gray-600">

      <Logo />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-6 font-semibold">
        <NavLink to="/">
          <li className="text-amber-800">HOME</li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="text-amber-800">DOCTORS</li>
        </NavLink>

        <NavLink to="/about">
          <li className="text-amber-800">ABOUT</li>
        </NavLink>

        <NavLink to="/contact">
          <li className="text-amber-800">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-3">

        {/* USER PROFILE */}
        {token ? (
          <div className="flex items-center gap-2 relative">

            {/* Profile Image */}
            {userData?.image ? (
              <img
                src={userData.image}
                alt={userData.name || "profile"}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setShowDropdown(prev => !prev)}
              />
            ) : (
              <span
                onClick={() => setShowDropdown(prev => !prev)}
                className="material-symbols-outlined text-blue-700 cursor-pointer"
                style={{ fontSize: "36px" }}
              >
                account_circle
              </span>
            )}

            {/* Arrow */}
            <span
              onClick={() => setShowDropdown(prev => !prev)}
              className="material-symbols-outlined text-emerald-700 cursor-pointer"
            >
              arrow_drop_down
            </span>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 top-12 bg-stone-200 rounded shadow-lg w-48 p-4 flex flex-col gap-3 font-semibold z-20">

                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 hover:text-blue-800 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-amber-800">
                    switch_account
                  </span>
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointment");
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 hover:text-blue-800 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-amber-800">
                    calendar_add_on
                  </span>
                  Appointments
                </p>

                <p
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-red-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-amber-800">
                    logout
                  </span>
                  Logout
                </p>

              </div>
            )}

          </div>
        ) : (
          /* Desktop Create Account Button */
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-800 text-white px-5 py-2 rounded-full hover:scale-105 transition hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <span
          onClick={() => setShowMenu(true)}
          className="material-symbols-outlined md:hidden cursor-pointer"
        >
          menu
        </span>

      </div>

      {/* Mobile Menu */}
      <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>

        <div className="flex items-center justify-between px-4 py-8 border-b">
          <Logo />
          <span
            onClick={() => setShowMenu(false)}
            className="material-symbols-outlined cursor-pointer"
          >
            close
          </span>
        </div>

        <ul className="flex flex-col items-center gap-5 mt-6 text-lg">

          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p>Home</p>
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p>Doctors</p>
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p>About</p>
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p>Contact</p>
          </NavLink>

          {/* Mobile Create Account */}
          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-blue-800 text-white px-6 py-2 rounded-full mt-4"
            >
              Create Account
            </button>
          )}

        </ul>

      </div>

    </div>
  );
};

export default Navbar;

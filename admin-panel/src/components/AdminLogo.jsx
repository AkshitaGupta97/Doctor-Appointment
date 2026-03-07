import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const AdminLogo = () => {

    const {adToken} = useContext(AdminContext);

  return (
    <div className="flex items-center gap-1 select-none">

      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 shadow-sm">
        <span className="material-symbols-outlined text-amber-300 text-3xl">
          admin_panel_settings
        </span>
      </div>

      <h1 className="text-lg font-bold bg-linear-to-r from-amber-800 to-blue-800 bg-clip-text text-transparent underline">
        Doc🩺<span>{adToken ? "Admin" : "Doctor"}</span>
      </h1>

    </div>
  );
};

export default AdminLogo;

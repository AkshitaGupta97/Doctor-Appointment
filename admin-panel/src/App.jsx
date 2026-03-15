import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const { adToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div>
      {adToken || dToken ? (
        <>
          <Navbar />
          <Sidebar />

          {/* Main Content */}
          <div className="mt-16 ml-16 md:ml-64 p-6 h-[calc(100vh-4rem)] overflow-y-auto transition-all">
            <Routes>

              {/* Admin routes */}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointment />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorList />} />

              {/* Doctor routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointment" element={<DoctorAppointment />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />

              <Route
                path="*"
                element={
                  <h1 className="text-2xl text-blue-900 text-center mt-20">
                    404 Not Found
                  </h1>
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;

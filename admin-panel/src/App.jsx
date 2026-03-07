import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";

function App() {

  const { adToken } = useContext(AdminContext);

  return (
    <div>
      {
        adToken ?
          (
            <>
              <Navbar />

              <div className="flex items-start">
                <Sidebar />
                <Routes>
                  <Route path='/' element={<></>} />
                  <Route path='/admin-dashboard' element={<Dashboard />} />
                  <Route path='/all-appointments' element={<AllAppointment/>} />
                  <Route path='/add-doctor' element={<AddDoctor/>} />
                  <Route path='/doctor-list' element={<DoctorList/>} />
                  <Route path='*' element={<h1 className="text-2xl text-center mt-20">404 Not Found</h1>} />
                </Routes>
              </div>
               
            </>
          )

          : <Login />
      }

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

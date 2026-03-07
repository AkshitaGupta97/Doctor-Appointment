import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

function App() {

  const {adToken} = useContext(AdminContext);

  return (
    <div>
      {
        adToken ? 
          <Navbar />
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

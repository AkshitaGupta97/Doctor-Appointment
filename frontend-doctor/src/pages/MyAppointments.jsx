import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['', 'Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const getUserAppointments = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { Authorization: `Bearer ${token}` }, });
      if (data.success) {
        setAppointments(data.appointments.reverse()); // get data in reverse order
        console.log(data.appointments);
      }
    } catch (error) {
      console.log("error from my-appoinment", error);
      toast.error(error.message);
    }
  }

  // cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("cancel appointment id -> ", appointmentId);
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } } // fixed template string
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getAllDoctors(); // refresh doctor data to update slots
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error from my-appointment", error);
      toast.error(error.message);
    }
  };

  // razorpay
  const appointmentRazorpay = async(appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay', {appointmentId}, { headers: { Authorization: `Bearer ${token}` } } );
      if(data.success){
        console.log("abcc ", data.order)
      }
    } catch (error) {
      console.error("error from my-appointment", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-amber-800 text-xl border-b border-b-blue-700  ">My Appointments</p>

      <div className="mt-4">
        {
          appointments.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b ">
              <div>
                <img className="w-32 bg-indigo-400 rounded-2xl" src={item.doctorData?.image} alt={item?.name} />
              </div>
              <div className="flex-1 text-gray-700">
                <p className="text-lg text-amber-700">{item.doctorData?.name}</p>
                <p className="text-teal-800">{item.doctorData?.speciality}</p>
                <p className="text-zinc-800 mt-1">Address: </p>
                <p className="text-sm text-blue-800">{item.doctorData?.address.line1}</p>
                <p className="text-sm text-blue-800">{item.doctorData?.address.line2}</p>
                <p><span className="text-blue-500 mt-2">Date & Time:</span> {slotDateFormat(item?.slotDate)} | {item?.slotTime} </p>

              </div>

              <div> </div>
              <div>
                {
                  !item?.cancelled &&
                    <button onClick={() => appointmentRazorpay(item._id)} className="bg-blue-700 sm-text-xs text-sm text-white rounded-2xl px-1 py-2 cursor-pointer hover:scale-95 transition-all">
                      Pay Online
                    </button>
                }
                <br />
                {
                  !item?.cancelled && 
                    <button onClick={() => cancelAppointment(item._id)} className="bg-red-800 sm:text-xs text-sm mt-2 text-white rounded-2xl px-1 py-2 cursor-pointer hover:scale-95 transition-all">
                      Cancel Appointment
                    </button>
                }
                {
                  item.cancelled && 
                    <button className="bg-gray-800 sm:text-xs font-semibold text-sm mt-2 text-red-400 rounded-2xl px-1.5 py-2 cursor-not-allowed">
                      Appointment Cancelled
                    </button>
                }
              
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MyAppointments

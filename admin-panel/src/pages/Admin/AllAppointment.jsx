import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const {adToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext);
  const {calculateAge, slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if(adToken){
      getAllAppointments();
    }
  }), [adToken];
  
  return (
    <div className="w-full max-w-6xl m-5">

      <p className="mb-3 text-xl text-blue-800 font-semibold sm:font-medium">All Appointments</p>

      <div className="bg-white border border-emerald-800 p-1 w-[90%] rounded max-h-[80vh] min-h-[60vh] overflow-y-scroll">

        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item, index) => (
            <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border-b bg-gray-300 hover:bg-gray-400" key={index}>
              <p className="max-sm:hidden">{index+1}</p>
              <div className="flex items-center gap-2">
                <img className="w-12 rounded-full" src={item.userData?.image} alt={item.userData?.name} />
                <p>{item.userData?.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img className="w-12 rounded-full bg-gray-400" src={item.doctorData?.image} alt={item.doctorData.name} />
                <p>{item.doctorData?.name}</p>
              </div>
              <p>{item?.amount}</p>
              {
                item?.cancelled ? <p className="text-red-800 ">Cancelled</p> 
                :<p><span onClick={() => cancelAppointment(item._id)} className="material-symbols-outlined cursor-pointer font-bold bg-red-100 rounded-full text-red-400">close</span></p>
              }
              
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default AllAppointment

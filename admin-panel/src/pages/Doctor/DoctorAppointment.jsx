import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, calculateAge, slotDateFormat, cancelAppointment, completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if(dToken){
      getAppointments();
    }
  },[dToken]);

  return (
    <div className="w-full max-w-5xl m-5">

      <p className="mb-3 text-xl underline font-lg text-amber-700">All Appointments</p>

      <div className="bg-white mt-2 border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">

        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b ">
          <p>#</p>
          <p>Patients</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date&time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div className="flex flex-wrap justify-between max-sm:gap-4 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-800 bg-gray-300 hover:bg-gray-400 border-b px-4" key={index}>
              <p className="max-sm:hidden">{index+1}</p>
              <div className="flex items-center gap-2">
                <img className="w-10 rounded-full" src={item.userData?.image} alt={item.userData?.name} />
                <p>{item.userData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-amber-800 inline border border-blue-700 px-2 rounded-full">{item?.payment ? <span className="text-green-700">Online</span> : 'CASH'}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{item?.amount}</p>
              <div className="flex gap-1.5">
                <p><span onClick={() => completeAppointment(item._id)} className="material-symbols-outlined cursor-pointer font-bold bg-red-200 rounded-full text-red-600">close</span></p>
                <p><span onClick={() => cancelAppointment(item._id)} className="material-symbols-outlined cursor-pointer font-bold bg-green-300 rounded-full text-green-600">check_small</span></p>
              </div>
            </div>
          ))
        }

      </div>

    </div>

    
  )
}

export default DoctorAppointment

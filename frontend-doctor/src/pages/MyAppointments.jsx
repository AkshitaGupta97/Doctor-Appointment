import { useContext } from "react"
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const {doctors} = useContext(AppContext);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-amber-800 text-xl border-b border-b-blue-700  ">My Appointments</p>

      <div className="mt-4">
        {
          doctors.slice(0,4).map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b ">
              <div>
                <img className="w-32 bg-indigo-400 rounded-2xl" src={item?.image} alt={item?.name} />
              </div>
              <div className="flex-1 text-gray-700">
                <p className="text-lg text-amber-700">{item?.name}</p>
                <p className="text-teal-800">{item?.speciality}</p>
                <p className="text-zinc-800 mt-1">Address: </p>
                <p className="text-sm text-blue-800">{item?.address.line1}</p>
                <p className="text-sm text-blue-800">{item?.address.line2}</p>
                <p><span className="text-blue-500 mt-2">Date & Time:</span> 3, march, 2026 | 4:27 pm</p>
                
              </div>

              <div> </div>
              <div>
                <button className="bg-blue-700 sm-text-xs text-sm text-white rounded-2xl px-1 py-2 cursor-pointer hover:scale-95 transition-all">Pay Online</button>
                <br />
                <button className="bg-red-800 sm:text-xs text-sm mt-2 text-white rounded-2xl px-1 py-2 cursor-pointer hover:scale-95 transition-all">Cancel Appointment</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MyAppointments

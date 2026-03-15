import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, slotDateFormat, cancelAppointment, completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="m-5">

      <div className="flex flex-wrap gap-2 justify-around shadow-lg p-4 rounded  shadow-cyan-900">

        <div className="flex items-center gap-2 bg-blue-800 text-white min-w-52 rounded-2xl shadow-cyan-950 shadow-lg border-2 p-2 cursor-pointer hover:scale-105 transition-all">
          <p><span className="material-symbols-outlined font-bold ">money_bag</span></p>
          <div className="flex flex-col justify-center">
            <p className=" font-bold text-xl text-amber-200 ">₹{dashData.earnings}</p>
            <p>Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-800 text-white min-w-52 rounded-2xl shadow-cyan-950 shadow-lg border-2 p-2 cursor-pointer hover:scale-105 transition-all">
          <p><span className="material-symbols-outlined font-bold">medical_services</span></p>
          <div>
            <p className=" font-bold text-xl text-amber-200">{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-800 text-white min-w-52 rounded-2xl shadow-cyan-950 shadow-lg border-2 p-2 cursor-pointer hover:scale-105 transition-all">
          <p><span className="material-symbols-outlined font-bold ">inpatient</span></p>
          <div>
            <p className=" font-bold text-xl text-amber-200">{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>

      </div>

      <div className="bg-white">

        <div className="flex items-center gap-2.5 py-4 mt-10 rounded-2xl shadow-lg shadow-cyan-950 px-4">
          <p className="font-bold text-lg text-amber-700">Latest Bookings..</p>
        </div>

        <div className="pt-4">
          {
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-gray-300 hover:bg-gray-400 rounded-md transition-all"
              >

                <img
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.userData.image}
                  alt={item.doctorData.name}
                />

                <div className="flex-1 text-sm">
                  <p className="text-amber-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                </div>

                {
                  item.cancelled ? <p className="text-red-700 underline">Cancelled</p> : item.isCompleted ?
                    <p className="text-green-700 underline">Completed</p>
                    : <div className="flex gap-1.5">
                      <p><span onClick={() => cancelAppointment(item._id)} className="material-symbols-outlined cursor-pointer font-bold bg-red-200 rounded-full text-red-600">close</span></p>
                      <p><span onClick={() => completeAppointment(item._id)} className="material-symbols-outlined cursor-pointer font-bold bg-green-300 rounded-full text-green-600">check_small</span></p>
                    </div>
                }


              </div>
            ))
          }
        </div>

      </div>



    </div>
  )
}

export default DoctorDashboard;

import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"

const Dashboard = () => {
  const { dashData, getDashData, adToken, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (adToken) {
      getDashData()
    }
  }, [adToken]);

  return dashData && (
    <div className="m-5">

      <div className="flex flex-wrap gap-2 shadow-lg p-4 rounded  shadow-cyan-900">

        <div className="flex items-center gap-2 bg-cyan-700 text-white min-w-52 rounded border-2 p-2 cursor-pointer hover:scale-105 transition-all"> 
          <p><span className="material-symbols-outlined font-bold ">admin_meds</span></p>
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-cyan-700 text-white min-w-52 rounded border-2 p-2 cursor-pointer hover:scale-105 transition-all">
          <p><span className="material-symbols-outlined font-bold">medical_services</span></p>
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-cyan-700 text-white min-w-52 rounded border-2 p-2 cursor-pointer hover:scale-105 transition-all">
          <p><span className="material-symbols-outlined font-bold ">inpatient</span></p>
          <div>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard

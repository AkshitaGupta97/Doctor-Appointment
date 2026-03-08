import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {

  const {doctors, adToken, getAllDoctorList, changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if(adToken){
      getAllDoctorList();
    }
  }, [adToken]);

  return (
    <div className="m-5 max-h-[90vh]">
      <h1 className="text-2xl text-cyan-900 underline font-bold mt-4 ">Doctor List</h1>
      <div className="flex w-full mt-4 shadow-lg shadow-gray-800 p-2 rounded-2xl flex-wrap gap-2 overflow-y-auto h-[80vh] pt-4 gap-y-6">
        {
          doctors.map((doctor) => (
            <div className="border p-4 mb-4 cursor-pointer flex items-center md:flex-col gap-4  border-blue-800 hover:scale-95 transition-all duration-300 shadow-lg shadow-emerald-950 rounded-3xl overflow-hidden w-full md:w-[48%] lg:w-[31%]"
               key={doctor._id} >
              <img className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover bg-blue-400 group-hover:bg-blue-500 transition-all duration-500" src={doctor.image} alt={doctor.name} />
              <div className="flex flex-col justify-center items-center gap-1">
                <h2 className="text-xl text-amber-800 font-semibold">{doctor.name}</h2>
                <p className="text-cyan-900">{doctor.speciality}</p>
                <p>{doctor.experience} years of experience</p>
                <div>
                  <input onChange={() => changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} className="mr-2 h-3.5 w-5 accent-cyan-900 cursor-pointer" />
                  <label className={`${doctor.available ? "text-green-600" : "text-red-600"} font-semibold`}>
                    {doctor.available ? "Available" : "Unavailable"}
                  </label>
                </div>

              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorList

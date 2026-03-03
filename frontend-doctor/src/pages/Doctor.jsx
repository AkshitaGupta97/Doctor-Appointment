import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";

const Doctor = () => {

  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className="text-teal-800 text-lg">⚕️Doctors not only treat diseases but also advice on maintaining a healthy lifestyle.</p>
      <div className="flex flex-col sm:flex-row items-start mt-5 gap-5">
        <button className={`text-md px-0.5 py-1 rounded-xl border cursor-pointer border-blue-900 transition-all md:hidden ${showFilter ? "bg-blue-700 text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>
          Filters🧪
        </button>
        <div className={`flex text-center flex-col gap-3.5 ${showFilter ? 'flex' : 'hidden sm:flex'} `}>
          <p onClick={() => speciality === 'Physician' ? navigate('/doctors'): navigate('/doctors/Physician')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Physician" ? "bg-teal-800 text-white" : ""}`}>Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-teal-800 text-white" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-teal-800 text-white" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatrians' ? navigate('/doctors'): navigate('/doctors/Pediatrians')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Pediatrians" ? "bg-teal-800 text-white" : ""}`}>Pediatrians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-teal-800 text-white" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Cardiologist' ? navigate('/doctors'): navigate('/doctors/Cardiologist')} className={`w-[94vw] sm:w-auto py-1.5 pr-16 border border-gray-600 rounded transition-all cursor-pointer ${speciality === "Cardiologist" ? "bg-teal-800 text-white" : ""}`}>Cardiologist</p>
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
          {
            filterDoc.map((item, idx) => (
              <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
                key={idx}
                className="bg-stone-200 cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-5 flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className=" text-blue-600">{item.speciality}</p>
                <p className=" text-gray-600">{item.degree}</p>
                <p className=" text-gray-600">Experience: {item.experience}</p>
                <p className="font-semibold flex items-center text-green-600 "><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>adjust</span>Available</p>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Doctor

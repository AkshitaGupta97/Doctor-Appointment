import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";

const Doctor = () => {

  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);

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
      <p>⚕️Doctors not only treat diseases but also advice on maintaining a healthy lifestyle.</p>
      <div>
        <div>
          <p>Physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatrians</p>
          <p>Neurologist</p>
          <p>Cardiologist</p>
        </div>

        <div >
          {
            filterDoc.map((item, idx) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)}
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

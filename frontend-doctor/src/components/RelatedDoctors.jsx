import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, docId, speciality]);

    return (
        <div className="mt-8">
            <h1 className="text-3xl text-center text-emerald-800">Related Doctors</h1>
            <p className="ssm:w-1/3 text-center ">Health needs, primary care, Our doctors offer routine checkups, preventive care best treatment🩺</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {relDoc.slice(0, 4).map((item, idx) => (
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
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={() => { navigate('/doctors'); scrollTo([0, 0]) }} className="bg-blue-300 cursor-pointer flex items-center text-gray-800 px-4 py-2 rounded-full">
                    more...<span className="material-symbols-outlined text-amber-800">arrow_right_alt</span>
                </button>
            </div>

        </div>
    )
}

export default RelatedDoctors

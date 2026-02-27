import { Link } from "react-router-dom"
import { specialityData } from "../assets/myassets"

const Speciality = () => {
    return (
        <div id="specility" className="flex flex-col gap-4 py-16">
            <h1 className="flex items-center text-3xl text-blue-900 justify-center">⚕️Speciality of Doctors</h1>
            <p className="s:w-1/3 text-center text-gray-800">🩺Doctors in our app come from a wide range of medical specialties to provide comprehensive care for every need.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {specialityData.map((item, idx) => (
                    <Link
                        key={idx} onClick={() => scrollTo(0,0)}
                        to={`/doctors/${item.speciality}`}
                        className="flex flex-col items-center bg-stone-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-4"
                    >
                        <img
                            src={item.image}
                            alt={item.speciality}
                            className="w-24 h-24 object-cover rounded-full mb-3"
                        />
                        <p className="text-gray-800 font-semibold text-center">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Speciality

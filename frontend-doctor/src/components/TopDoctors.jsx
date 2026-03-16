import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div>
            <h1 className="text-3xl text-center text-emerald-800">Top Doctors</h1>
            <p className="ssm:w-1/3 text-center ">Health needs, primary care, Our doctors offer routine checkups, preventive care best treatment🩺</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {doctors.slice(0, 9).map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            if (item.available) {
                                navigate(`/appointment/${item._id}`)
                                scrollTo(0, 0)
                            }
                        }}
                        className={`cursor-pointer rounded-xl shadow-md p-5 flex flex-col items-center text-center
                            ${item.available ? "bg-stone-200 hover:-translate-y-1" : "bg-gray-200 opacity-70 cursor-not-allowed"}`}
                    >
                        <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-24 h-24 object-cover rounded-full mb-4"
                        />
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-blue-600">{item?.speciality}</p>
                        <p className="text-gray-600">{item.degree}</p>
                        <p className="text-gray-600">
                            Experience: {item.experience}
                        </p>
                        <p className={`font-semibold flex items-center gap-1 ${item.available ? "text-green-600" : "text-red-600"
                            }`}>
                            <span className="material-symbols-outlined text-sm">
                                adjust
                            </span>
                            {item.available ? "Available" : "Unavailable"}
                        </p>

                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className="bg-blue-300 cursor-pointer flex items-center text-gray-800 px-4 py-2 hover:scale-95 transition-all rounded-full">
                    more...<span className="material-symbols-outlined text-amber-800">arrow_right_alt</span>
                </button>
            </div>

        </div>
    )
}

export default TopDoctors

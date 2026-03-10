import { useNavigate } from "react-router-dom"

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="flex bg-blue-800 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-16 md:mx-10">
            {/* ---- LEFT SIDE  ---- */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg::py-24 lg:pl-5" >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">
                    <p>Book Appointment</p>
                    <p className="mt-4">With 100+ trusted doctors.</p>
                </div>
                <button onClick={()=> {navigate('/login'); scrollTo(0,0)}}
                    className="bg-stone-300 flex items-center justify-center mt-3.5 cursor-pointer sm:text-base px-4 py-2 rounded-full hover:scale-105 transition-all">
                    Create Account<span className="material-symbols-outlined text-amber-800">arrow_right_alt</span>
                </button>
            </div>

            {/* ---- RIGHT SIDE  ---- */}
            <div className="hidden md:block md:w-1/2 lg:w-90 relative">
                <img className="w-full absolute bottom-0 right-0 max-w-md" src="https://www.pngmart.com/files/21/Doctor-PNG-Transparent.png" alt="banner" />
            </div>

        </div>
    )
}

export default Banner

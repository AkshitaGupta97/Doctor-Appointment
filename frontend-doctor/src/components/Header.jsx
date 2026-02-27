
export const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-teal-950 rounded-lg px-4 md:px-8 lg:px-12">

        {/* Left side ********** */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw] md:mb-[-20px]">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">🩺 Connecting Doctors<br /> ⚕️Your Health, Our Priority</p>

            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm">
                <img className="w-20 h-20 rounded-full" src="https://tse4.mm.bing.net/th/id/OIP.K_BXs9enNkizSzl4pWpn9AHaHa?w=980&h=980&rs=1&pid=ImgDetMain&o=7&rm=3 " alt="leftheader" />
                <p className="">👨‍⚕️ <span className="text-blue-200 text-lg">MediLink</span> — Your Trusted Health Partner💊 Book Appointments, Stay Healthy</p>
            </div>

            <a href="#specility" className="mt-auto flex justify-center items-center bg-cyan-100 px-1 py-2 rounded-full text-gray-600  m-auto md:m-0 hover:scale-105 translate-all duration-300">
                🏥Book Appointments <span className="material-symbols-outlined text-amber-800">arrow_right_alt</span>
            </a>

        </div>

        {/* Right side ********** */}
        <div className="md:w-1/2 relative">
            <img className="w-full md:absolute bottom-3.5 h-auto rounded-lg" src="https://pngimg.com/uploads/doctor/doctor_PNG16032.png" alt="headerimage" />
        </div>
        
    </div>
  )
}

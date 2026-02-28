import Logo from "./Logo"

const Footer = () => {
  return (
    <div className="md:mx-10 shadow-lg shadow-gray-800 px-1  rounded-2xl ">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  ">
            {/* left section */}
            <div>
                <Logo />
                <p className="w-full md:w-2/3 text-gray-800 leading-5">A doctor is a trained medical professional who diagnoses illnesses, provides treatment, and guides patients toward better health. </p>
            </div>
            {/* middle section */}
            <div>
                <p className="text-blue-900 mb-5">Company</p>
                <ul className="flex flex-col gap-2 text-gray-800">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/* right section */}
            <div>
                <p className="text-blue-900 mb-5">Get in touch</p>
                <ul className="flex flex-col gap-2 text-gray-800">
                    <li>+7878090956</li>
                    <li>medilink@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* copt right */}
        <div>
            <hr className="text-amber-800" />
            <p className="py-5 text-sm text-gray-800 text-center">Copyright 2026@ <span className="text-blue-700" >⚕️Medilink</span> - All rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer




const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 text-gray-700">
        <p>Contact <span className="text-amber-800">Us</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-18 text-sm">
        <img className="w-full md:max-w-90 " src="https://pngimg.com/uploads/doctor/doctor_PNG16025.png" alt="contact" />

        <div className="flex flex-col text-lg justify-center items-start gap-4">
          <p className="text-xl border-b border-amber-900 text-teal-800">Our Office</p>
          <p className="text-gray-700">90897 Road-05 Main Road <br /> Patna, Bihar, India🚩🌏</p>
          <p className="text-gray-800">Tel📱: (+91) 7890465623 <br /> Email: <span className="text-blue-500">medilink@gmail.com </span></p>
          <p>Careers at <span className="text-blue-900">MEDILINK🩺</span></p>
          <p className="text-gray-700">Beyond treatment, our doctors focus on prevention and long-term wellness🌿</p>
          <button className="border border-blue-800 cursor-pointer bg-blue-800 hover:bg-blue-950 transition-all duration-500 text-white mt-6 rounded-full px-1 py-2">Explore Jobs🚀</button>
        </div>

      </div>

    </div>
  )
}

export default Contact

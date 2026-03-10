
const About = () => {
  return (
    <div>
      <div className="flex justify-center">
        <p className="text-xl ">About <span className="text-amber-800">Us</span>🏥</p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-90" src="https://wallpapercave.com/wp/wp3487952.png" alt="about doc" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-md text-teal-900">
          <p>
            Our doctors are dedicated professionals who combine medical excellence with genuine compassion ❤️. 
            With years of experience and advanced training, they are committed to providing personalized care tailored to each patient’s needs.
          </p>
          <p>
            We believe that healing begins with trust 🤝. That’s why our doctors take the time to listen carefully, 
            explain diagnoses clearly, and guide patients through every step of their healthcare journey.
          </p>
          <b className="text-amber-900">Our Vision</b>
          <p>
            Your health is our priority 🌟.
            Our specialists stay updated with the latest medical advancements 🔬 and modern technologies to deliver safe, effective, and evidence-based treatments.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>Why <span className="text-teal-800">Choose Us</span></p>
      </div>

      <div className="flex flex-col text-gray-800 gap-2 md:flex-row mb-20">

        <div className="border px-8 md:px-10 sm:py-12 rounded-2xl  flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer ">
          <b>⚡Efficiency</b>
          <p>Our doctors value your time as much as your health. With streamlined appointment scheduling, minimal waiting periods🕒</p>
        </div>

        <div className="border px-8 md:px-10 sm:py-12 rounded-2xl  flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer ">
          <b>📅 Convenience</b>
          <p>Healthcare should fit seamlessly into your busy life. That’s why we offer flexible appointment options, easy booking systems, and smooth follow-up procedures. 🏥</p>
        </div>

        <div className="border px-8 md:px-10 sm:py-12 rounded-2xl  flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer ">
          <b>🌟 Personalized Care</b>
          <p>We believe every patient is unique. 🤝 Our doctors take time to understand your medical history, lifestyle, and specific concerns</p>
        </div>

      </div>

    </div> 
  )
}

export default About

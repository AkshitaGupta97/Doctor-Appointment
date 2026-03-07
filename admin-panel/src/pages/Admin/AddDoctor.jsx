
const AddDoctor = () => {
  return (
    <div className="bg-gray-50 p-4 w-full">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl underline text-amber-800 font-bold">Add Doctor</h1>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 w-full overflow-y-auto max-h-[90vh]">

        <div className="space-y-6">

          <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-400 rounded-lg py-6 px-4 cursor-pointer hover:border-blue-400 transition-colors">
            <label htmlFor="doc-img" className="cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-gray-600">image_arrow_up</span>
            </label>
            <input type="file" id="doc-img" hidden />
            <p className="text-blue-600 font-medium text-center">Upload doctor <br /> picture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* left */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-blue-800">Name</label>
                <input type="text" id="name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-blue-800">Doctor Email</label>
                <input type="email" id="email" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's email" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pass" className="font-semibold text-blue-800">Doctor Password</label>
                <input type="password" id="pass" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Password" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="exp" className="font-semibold text-blue-800">Experience</label>
                <input type="text" id="exp" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Experience" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fee" className="font-semibold text-blue-800">Fees</label>
                <input type="text" id="fee" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Fees" />
              </div>
            </div>
            {/* right */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="specialization" className="font-semibold text-blue-800">Speciality</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="specialization">
                  <option className="font-semibold text-amber-600" value="">Select speciality</option>
                  <option className="font-semibold text-amber-600" value="cardiology">Cardiologist</option>
                  <option className="font-semibold text-amber-600" value="dermatology">Dermatologist</option>
                  <option className="font-semibold text-amber-600" value="neurology">Neurologist</option>
                  <option className="font-semibold text-amber-600" value="pediatrics">Pediatrician</option>
                  <option className="font-semibold text-amber-600" value="psychiatry">Physician</option>
                  <option className="font-semibold text-amber-600" value="radiology">Gynecologist</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="educat" className="font-semibold text-blue-800">Education</label>
                <input type="text" id="educat" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Education" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="font-semibold text-blue-800">Doctor Address</label>
                <input type="text" id="add1" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Address I" />
                <input type="text" id="add2" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Address II" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="about" className="font-semibold text-blue-800">About Doctor</label>
            <textarea className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full resize-none" id="about" placeholder="Write about doctor" rows="4" required />
          </div>


          <div className="flex justify-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Add Doctor
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AddDoctor

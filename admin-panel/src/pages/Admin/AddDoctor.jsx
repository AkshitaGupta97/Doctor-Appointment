import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify';
import axios from "axios";

const AddDoctor = () => {
  const {backendUrl, adToken} = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [fee, setFee] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
      if(!docImg){
        return toast.error("Image not selected!")
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fee);
      formData.append('about', about);
      formData.append('degree', degree);
      formData.append('speciality', speciality);
      formData.append('address', JSON.stringify({line1:address1, line2:address2}));

      // vlaues of formData
      /*formData.forEach((val, key) => {
        console.log(`${key} : ${val}`);
      })*/

        const {data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
          headers: {
            Authorization: `Bearer ${adToken}`
          }
        });
        if(data.success){
          toast.success(data.message);
          setDocImg(false);
          setName('');
          setEmail('');
          setPassword('');
          setExperience('');
          setEducation('');
          setFee('');
          setAbout('');
          setSpeciality('Physician');
          setDegree('');
          setAddress1('');
          setAddress2('');
          console.log(data);
        }
        else{
          toast.error(data.message);
        }

    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="bg-gray-50 p-4 w-full">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl underline text-amber-800 font-bold">Add Doctor</h1>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 w-full overflow-y-auto max-h-[90vh]">

        <div className="space-y-6">

          <div className="flex flex-col items-start gap-2 border-2 border-dashed border-gray-400 w-36 h-36 rounded-lg py-4 px-2 cursor-pointer hover:border-blue-400 transition-colors">
            <label htmlFor="doc-img" className="cursor-pointer">
              <p>
                {
                  docImg ? <img className="w-20 h-24 border rounded-2xl" src={URL.createObjectURL(docImg)} alt="" /> : <span className="material-symbols-outlined text-4xl text-gray-600">image_arrow_up</span>
                }
              </p>
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            {docImg ? "" : <p className="text-blue-600 font-medium text-center">Upload doctor <br /> picture</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* left */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-blue-800">Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name}
                  type="text" id="name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-blue-800">Doctor Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email}
                  type="email" id="email" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's email" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pass" className="font-semibold text-blue-800">Doctor Password</label>
                <input  onChange={(e) => setPassword(e.target.value)} value={password}
                  type="password" id="pass" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Password" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="exp" className="font-semibold text-blue-800">Experience</label>
                <input  onChange={(e) => setExperience(e.target.value)} value={experience}
                  type="text" id="exp" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Experience" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fee" className="font-semibold text-blue-800">Fees</label>
                <input  onChange={(e) => setFee(e.target.value)} value={fee}
                  type="text" id="fee" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Fees" />
              </div>
            </div>
            {/* right */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="specialization" className="font-semibold text-blue-800">Speciality</label>
                <select  onChange={(e) => setSpeciality(e.target.value)} value={speciality}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="specialization">
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
                <input onChange={(e) => setEducation(e.target.value)} value={education}
                  type="text" id="educat" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Education" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="degree" className="font-semibold text-blue-800">Degree</label>
                <input onChange={(e) => setDegree(e.target.value)} value={degree}
                  type="text" id="degree" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Degree" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="font-semibold text-blue-800">Doctor Address</label>
                <input onChange={(e) => setAddress1(e.target.value)} value={address1}
                 type="text" id="add1" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Address I" />
                <input  onChange={(e) => setAddress2(e.target.value)} value={address2}
                  type="text" id="add2" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter doctor's Address II" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="about" className="font-semibold text-blue-800">About Doctor</label>
            <textarea  onChange={(e) => setAbout(e.target.value)} value={about}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full resize-none" id="about" placeholder="Write about doctor" rows="4" required />
          </div>


          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:scale-95 cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Add Doctor
            </button>
          </div>

        </div>

      </div>

    </form>
  )
}

export default AddDoctor

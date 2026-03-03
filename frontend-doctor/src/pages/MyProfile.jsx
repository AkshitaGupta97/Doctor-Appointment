import { useState } from "react"

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "abc",
    image: "https://wallpapercave.com/wp/wp3487952.png",
    email: "abc@gmail.com",
    phone: '90909099876',
    address: {
      line1: "kjzhdjaa",
      line2: "kjjhdkjhkfjo"
    },
    gender: 'Male',
    dob: '2004-03-12'
  });

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-44 rounded-2xl" src={userData.image} alt="profile" />
      {
        isEdit ?
          <input className="bg-gray-400 text-lg px-0.5 py-1 max-w-60 mt-4 outline-none  rounded-xl"
           type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className="text-amber-800 text-xl">{userData.name}</p>
      }

      <hr className="bg-zinc-600 h-px border-none " />

      <div>
        <p className="text-neutral-600 text-lg underline mt-0.5" >CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p >Email id: </p>
          <p className="text-blue-600">{userData.email}</p>
          <p>Phone:</p>
          {
            isEdit ?
              <input className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none  rounded-xl"
               type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className="text-blue-600">{userData.phone}</p>
          }
          <p className="text-neutral-700">Address:</p>
          {
            isEdit ?
              <p>
                <input className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none  rounded-xl"
                 value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <br />
                <input className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none  rounded-xl"
                 value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </p> :
              <p className="text-teal-700">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div >
        <p className="text-neutral-600 text-lg underline mt-0.5">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
          <p>Gender: </p>
          {
            isEdit ?
              <select  className="max-w-20 bg-gray-900 text-white rounded-2xl"
                value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className="text-gray-600">{userData.gender}</p>
          }
          <p>Date of Birth: </p>
          {
            isEdit ? 
              <input className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none  rounded-xl"
               type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}  /> : 
              <p className="text-gray-600">{userData.dob}</p>
          }
        </div>
      </div>

      <div>
        {
          isEdit ? 
            <button className="bg-blue-700 text-white px-6 py-1 cursor-pointer hover:scale-95 transition-all text-lg rounded-full " onClick={() => setIsEdit(false)}>Save</button> : 
            <button className="bg-teal-700 text-white px-6 py-1 cursor-pointer hover:scale-95 transition-all text-lg rounded-full " onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile

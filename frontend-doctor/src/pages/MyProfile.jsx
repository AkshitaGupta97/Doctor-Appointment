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

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <img src={userData.image} alt="profile" />
      {
        isEdit ?
          <input type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p>{userData.name}</p>
      }

      <hr />

      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id: </p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {
            isEdit ?
              <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p>{userData.phone}</p>
          }
          <p>Address:</p>
          {
            isEdit ? 
              <p>

              </p> : 
              <p>
                
              </p>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile

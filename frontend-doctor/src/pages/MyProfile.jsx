import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      formData.append("address[line1]", userData.address.line1);
      formData.append("address[line2]", userData.address.line2);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(data.success){
        toast.success(data.message);
        loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
      else{
        toast.error(data.message);
      }

      console.log("update profile response", data);

    } catch (error) {
      console.log(error);
    }
  };

  /* const [userData, setUserData] = useState({
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
    });*/

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {
        isEdit ?
          <label htmlFor="image">
            <div className="inline-block  relative cursor-pointer">
              <img className="w-32 h-32 cursor-pointer rounded-full opacity-80" src={image ? URL.createObjectURL(image) : userData?.image || null} alt={userData?.name} />
              <img className="w-28 h-28 cursor-pointer rounded-full absolute bottom-6 right-8" src={!image ? 'https://th.bing.com/th/id/OIP.Bl6dInu-pv4nnfv-QAxgSwHaHa' : null} alt="edit" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          : <img className="w-36 rounded" src={userData?.image || null} alt={userData?.name} />
      }

      {isEdit ? (
        <div className="flex   gap-4 items-center">
          <label htmlFor="name">Name:</label>
          <input
            className="bg-gray-400 text-lg px-0.5 py-1 max-w-60 mt-4 outline-none rounded-xl"
            type="text" id="name"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
      ) : (
        <p className="text-amber-800 text-xl">{userData?.name || ""}</p>
      )}

      <hr className="bg-zinc-600 h-px border-none " />

      <div>
        <p className="text-neutral-600 text-lg underline mt-0.5">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          {/*  <p>Email id: </p>
          <p className="text-blue-600">{userData?.email || ""}</p>  */}

          <p>Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none rounded-xl"
              type="text"
              value={userData?.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-600">{userData?.phone || ""}</p>
          )}

          <p className="text-neutral-700">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none rounded-xl"
                value={userData?.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line1: e.target.value,
                    },
                  }))
                }
                type="text"
              />
              <br />
              <input
                className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none rounded-xl"
                value={userData?.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line2: e.target.value,
                    },
                  }))
                }
                type="text"
              />
            </p>
          ) : (
            <p className="text-teal-700">
              {userData?.address?.line1 || ""}
              <br />
              {userData?.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-600 text-lg underline mt-0.5">
          Basic Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
          <p>Gender: </p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-900 text-white rounded-2xl"
              value={userData?.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData?.gender || ""}</p>
          )}

          <p>Date of Birth: </p>
          {isEdit ? (
            <input
              type="date"
              className="bg-gray-400 px-0.5 py-1 text-lg max-w-60 mt-4 outline-none rounded-xl"
              value={
                userData?.dob && userData.dob !== "Not Selected"
                  ? userData.dob
                  : ""
              }
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-600">{userData?.dob || ""}</p>
          )}
        </div>
      </div>

      <div>
        {isEdit ? (
          <button
            className="bg-blue-700 text-white px-6 py-1 cursor-pointer hover:scale-95 transition-all text-lg rounded-full"
            onClick={updateUserProfileData}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-teal-700 text-white px-6 py-1 cursor-pointer hover:scale-95 transition-all text-lg rounded-full"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

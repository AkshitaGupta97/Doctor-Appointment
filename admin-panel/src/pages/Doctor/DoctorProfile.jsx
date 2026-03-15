import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {

  const { dToken, backendUrl, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctors/update-profile', updateData, { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error from update profile", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div>
      <p className="text-2xl text-center underline text-cyan-800">⚕️Doctor's Profile</p>

      <div className="flex flex-col gap-2 m-4">

        <div>
          <img
            className="w-64 rounded-lg max-sm:w-44 shadow-lg shadow-blue-800"
            src={profileData?.image}
            alt={profileData?.name}
          />
        </div>

        <div className="flex-1 border mt-2 border-blue-700 rounded-lg p-4 shadow-lg shadow-gray-500">

          {/* doctor info */}
          <p className="text-blue-900 mb-2 flex items-center gap-2 text-2xl underline">
            {profileData?.name}
          </p>

          <div className="flex items-center gap-2 text-amber-950">
            <p>{profileData?.degree} - {profileData?.speciality}</p>
            <button className="py-0.5 text-sm px-2 border rounded-full border-cyan-700">
              {profileData?.experience}
            </button>
          </div>

          {/* about */}
          <div>
            <p className="flex items-center gap-1 text-lg text-blue-700">About:</p>
            <p className="text-gray-800 max-w-175 mt-1">
              {profileData?.about}
            </p>
          </div>

          {/* fees */}
          <p className="mt-4 text-cyan-800">
            Appointment Fee:
            <span className="text-amber-800">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData(prev => ({
                      ...prev,
                      fees: e.target.value
                    }))
                  }
                  className="border px-2 ml-2 rounded"
                />
              ) : (
                ` ₹${profileData?.fees}`
              )}
            </span>
          </p>

          {/* address */}
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p className="text-amber-700">
              {isEdit ?
                <input className="border px-2 ml-2 rounded" type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                : profileData.address?.line1}
              <br />
              {isEdit ?
                <input className="border px-2 ml-2 rounded" type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                : profileData.address?.line2}
            </p>
          </div>

          {/* availability */}
          <div className="flex gap-1 pt-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData(prev => ({
                  ...prev,
                  available: !prev.available
                }))
              }
              className="w-3 h-4 accent-cyan-700 cursor-pointer"
            />
            <label>
              {profileData.available ? (
                <span className="text-green-600 font-semibold bg-green-200 px-2 py-0.5 rounded-md">
                  Available
                </span>
              ) : (
                <span className="text-red-600 font-semibold bg-red-100 px-2 py-0.5 rounded-md">
                  Unavailable
                </span>
              )}
            </label>

          </div>

          {/* edit button */}
          {
            isEdit ? <button
              onClick={updateProfile}
              className="px-6 py-1 border text-white cursor-pointer border-blue-700 bg-blue-900 hover:scale-105 transition-all rounded-full mt-4"
            >
              Save
            </button>
              : <button
                onClick={() => setIsEdit(!isEdit)}
                className="px-6 py-1 border text-white cursor-pointer border-cyan-700 bg-cyan-900 hover:scale-105 transition-all rounded-full mt-4"
              >
                Edit
              </button>
          }

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

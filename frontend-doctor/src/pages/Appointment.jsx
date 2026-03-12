import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, getAllDoctors, backendUrl, token } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const navigate = useNavigate();

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(1);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return; // - If docInfo is not yet loaded, exit immediately (prevents errors).
    setDocSlots([]); // - Clears out any old slots (setDocSlots([])).
    let today = new Date(); // - Creates a Date object for the current day/time.

    for (let i = 0; i < 7; i++) {  // - Loops from i = 0 to i = 6 → covers today + next 6 days.
      let currentDate = new Date(today); // : the working time pointer for that day.
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today); // : the end time pointer for that day.
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {  // - Start at the next half-hour after current time, but not before 10 AM.
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      /*- Example: if now is 3:15 PM → start at 4:00 PM.
        - If it’s a future day:
        - Start at 10:00 AM sharp.
      */

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        /**- Loop runs until currentDate reaches 9 PM.
          - Formats the time into a readable string (e.g., "04:30 PM").
        */

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = `${day}_${month}_${year}`;

        // Safe check - - isSlotAvailable is true if not booked.
        const bookedSlots = docInfo?.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(formattedTime);

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          available: isSlotAvailable, // mark availability
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      //- Advances currentDate by 30 minutes. - Loop continues until 9 PM.

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          doctorId: docId,
          slotTime,
          slotDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in appointment", error);
      toast.error("Failed to book appointment");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  

  return (
    <div>
      {/* doctor details */}
      <div className="flex flex-col sm:text-sm sm:flex-row gap-4">
        <div>
          <img className="w-full sm:max-w-60 rounded-lg shadow-lg" src={docInfo?.image} alt={docInfo?.name} />
        </div>
        {/* doc info -  name, deg, exp */}
        <div className="flex-1 border-gray-400 rounded-lg p-8 py-7 bg-stone-700 text-white shadow-lg mx-2 sm:mx-0 mt-20 sm:mt-0 ">
          <p className="flex items-center gap-2 text-xl text-amber-200 ">
            {docInfo?.name}
            <span className="material-symbols-outlined bg-blue-600 text-white rounded-full text-[12px]">
              check_circle
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm mt-1">
            <p className="text-blue-300">{docInfo?.degree} - {docInfo?.speciality}</p>
            <button className="py-0.5 px-2 border text-sm  border-amber-200 rounded-full">{docInfo?.experience}</button>
          </div>

          {/* Doctor about */}
          <div>
            <p className="flex items-center gap-1 font-medium text-cyan-200 mt-4">About <span className="material-symbols-outlined bg-teal-700 text-white rounded-full text-[18px]">info</span> </p>
            <p className=" max-w-175 mt-4">{docInfo?.about}</p>
          </div>

          <p className="text-cyan-100">
            Appointment fee : <span className="text-green-200">${docInfo?.fees}</span>
          </p>

          <div className="mt-4 ">
            <p className="flex items-center gap-2">Address: <span className="material-symbols-outlined bg-blue-600 text-white rounded-full text-[12px]">local_pharmacy</span></p>
            <p className="text-pink-200">{docInfo?.address?.line1}</p>
            <p className="text-pink-200">{docInfo?.address?.line2}</p>
          </div>

        </div>

      </div>

      {/* booking slots */}
      <div className="sm:ml-72 sm:pl-4 text-gray-700">
        <p className="text-xl text-amber-800 mt-4">Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} onClick={() => { setSlotIndex(index); setSlotTime(''); }}// optional: reset selected time when day changes
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-teal-900 text-white" : "border-gray-800 "}`} >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots[slotIndex].map((item, idx) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-blue-700 text-white" : "text-gray-600 border border-gray-700 "}`} key={idx}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button onClick={bookAppointment}
          className="bg-teal-800 text-white rounded-full px-2 py-2 cursor-pointer mt-4 items-center justify-center hover:scale-105 transition-all ">
          Book Apointment
        </button>
      </div>

      {/* listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />

    </div>
  )
}

export default Appointment

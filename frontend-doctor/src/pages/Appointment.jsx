import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {

  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(1);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo)
  }

  // days of 30-minute time slots (from 10 AM to 9 PM) and stores them in docSlots.
  const getAvailableSlots = async () => {
    setDocSlots([]);
    // get current data
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting and time of date
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // seeting hours 
      /* If current time is:
        8 AM → start at 10 AM ; 3 PM → start at 4 PM ; 10:45 AM → start at 11 AM
       */
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0) //either :00 or :30
      } //4:00, 4:30, 5:00, 5:30
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) { //Once it becomes 9:00 PM, the loop stops.
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate), //Sat Feb 28 2026 16:30:00,
          time: formattedTime  //"04:30 PM"
        });

        // increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);  //10:00 → 10:30 → 11:00 → 11:30 → ..

      }
      setDocSlots(prev => ([...prev, timeSlots]));

    }
  }


  useEffect(() => {
    fetchDocInfo();
  }), [doctors, docId];

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

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
              <div key={index}  onClick={() => {setSlotIndex(index); setSlotTime(''); }}// optional: reset selected time when day changes
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-teal-900 text-white":"border-gray-800 "}`} >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots[slotIndex].map((item, idx) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-blue-700 text-white" :"text-gray-600 border border-gray-700 "}`} key={idx}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button className="bg-teal-800 text-white rounded-full px-2 py-2 cursor-pointer mt-4 items-center justify-center hover:scale-105 transition-all ">Book Apointment</button>
      </div>

      {/* listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />

    </div>
  )
}

export default Appointment

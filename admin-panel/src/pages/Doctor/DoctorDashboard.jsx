import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"

const DoctorDashboard = () => {
  const {dToken, getDashData, dashData, setDashData} = useContext(DoctorContext);

  useEffect(() => {
    if(dToken){
      getDashData();
    }
  },[dToken]);

  return dashData && (
    <div>

    </div>
  )
}

export default DoctorDashboard;

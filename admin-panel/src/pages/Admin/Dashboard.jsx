import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"

const Dashboard = () => {
  const {dashData, getDashData, adToken, cancelAppointment} = useContext(AdminContext);

  useEffect(() => {
    if(adToken){
      getDashData()
    }
  },[adToken]);

  return (
    <div>
      
    </div>
  )
}

export default Dashboard

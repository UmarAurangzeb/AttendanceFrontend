import { useEffect } from 'react';
import '../Styles/successStyles.css'
import img from '../img/logo.png'
import DeveloperDay from './toolTip';
function SuccessMessage({teamName,msg}) {
  useEffect(()=>{
    document.title="Coders Cup Attendance Confirmation"
  })
  return ( 
    <div>
      <div className="SuccessContainer">
        <div className="content">
          <img src={img} alt="Developer Day Logo" /> 
            <div className="heading h2">Attendance Confirmed!</div>
            <div className="text fs-6">We're thrilled to have you here,{teamName}! Thank you for joining us at Coder's Cup 2024.{msg}</div>
        </div>
      </div>
      <div>
        <DeveloperDay/>
      </div>
    </div>
   );
}

export default SuccessMessage;
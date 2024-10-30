import '../Styles/successStyles.css'
import img from '../img/dd.png'
function SuccessMessage({teamName,msg}) {
  return ( 
    <div className="container">
      <div className="content">
        <img src={img} alt="Developer Day Logo" /> 
          <div className="heading h2">Thank you!</div>
          <div className="text fs-6">Thank you, {teamName}, for attending Developers' Day 2024. {msg}</div>
      </div>
    </div>
   );
}

export default SuccessMessage;
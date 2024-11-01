import { useEffect, useState, useRef } from "react";
import { getGroupData,updateGroupData } from "../api/api";
import '../Styles/attendance.css'
import myImg from '../img/logo.png';
import DeveloperDay from "./toolTip";
import { useNavigate } from "react-router-dom";

function AttendanceForm() {
  const [submission,setSubmission] = useState(false)
  const [formData, setFormData] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate()

  async function useFetch() {
    const response = await getGroupData();
    setFormData(response)
  }
  useEffect(()=>{
    document.title='Coders Cup- Mark Attendance'
  },[])

  useEffect(() => {
    useFetch();
  }, [submission]);

  async function handleSubmit(event) {
    let markAttendance = false;
    event.preventDefault();
    setSubmission(!submission)
    const array = formData.forEach((item)=>{
      if(item.attendance_code===inputCode){
        item.attendance = true
        markAttendance=true
      }
    })
    setFormData(array)
    console.log(formData);
    if(markAttendance){
      await updateGroupData(formData)
      navigate("/success")
    }else{
      alert('Invalid Code')
    }
  }

  return (
    
    <div>
      <div className="AnotherContainer">
        <div className="box">
          <div className="haha">
            <img src={myImg} className="image" alt="Logo" />
            <div className="heading1">Mark Attendance</div>
          </div>
          <form id="attendanceform" onSubmit={handleSubmit} method="post">
            <input
              id="code"
              className="form-control input-field"
              placeholder="Enter code here"
              style={{ margin: '1vw 0' }}
              name="code"
              value={inputCode}
              onChange={(event) => setInputCode(event.target.value)}
              required
              maxLength={9}
            />
            <br />
            <button className="submit-button btn">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <DeveloperDay/>
      </div>
    </div>
  );
}

export default AttendanceForm;

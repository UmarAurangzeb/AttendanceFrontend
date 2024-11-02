import React, { useEffect, useState, useRef } from "react";
import { getGroupData, updateGroupData } from "../api/api";
import '../Styles/attendance.css'
import myImg from '../img/logo.png';
import DeveloperDay from "./tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AttendanceForm() {
  const [submission, setSubmission] = useState(false)
  const [formData, setFormData] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate()
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const FETCH_URL = process.env.FETCH_URL || `http://localhost:4000`;

  // async function useFetch() {
  //   const response = await getGroupData();
  //   setFormData(response)
  // }
  useEffect(() => {
    document.title = 'Coders Cup- Mark Attendance'
  }, [])

  // useEffect(() => {
  //   useFetch();
  // }, [submission]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

          },
          (error) => {
            console.log("error setting geolocation", error)
          }
        );
      } else {
        console.log("geolocation not supported");
      }
    };
    getLocation();
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!location.latitude || !location.longitude) {
        alert("enable geolocation and try again");
        return;
      }

      await axios.put(`${FETCH_URL}/MarkAttendance`, {
        code: inputCode,
        latitude: location.latitude,
        longitude: location.longitude
      })
        .then(response => {
          console.log(response);
          response.data.success && navigate("/success")
        })
        .catch(error => {
          console.error(error.response);
          alert(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }



    // let markAttendance = false;
    // event.preventDefault();
    // setSubmission(!submission)
    // const array = formData.forEach((item)=>{
    //   if(item.attendance_code===inputCode){
    //     item.attendance = true
    //     markAttendance=true
    //   }
    // })
    // setFormData(array)
    // console.log(formData);
    // if(markAttendance){
    //   await updateGroupData(formData)
    //   navigate("/success")
    // }else{
    //   alert('Invalid Code')
    // }
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
        <DeveloperDay />
      </div>
    </div>
  );
}

export default AttendanceForm;

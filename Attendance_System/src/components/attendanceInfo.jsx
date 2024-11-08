import React, { useEffect, useState, useRef } from "react";
import { getGroupData, updateGroupData } from "../api/api";
import '../Styles/base.css'
import '../Styles/introStyles.css'
import myImg from '../img/logo2.png';
import DeveloperDay from "./tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AttendanceForm() {
  const [submission, setSubmission] = useState(false)
  const [formData, setFormData] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate()
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isError, seterror] = useState({
    error: false,
    errorMessage: ''
  });
  const [loading, setloading] = useState(false);
  // const FETCH_URL=process.env.FETCH_URL ||  ;


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
        seterror({
          error: true,
          errorMessage: "enable geolocation and try again"
        })
        // alert("enable geolocation and try again");
        return;
      }
      setloading(true);
      await axios.put('https://attendance-backend-roan.vercel.app/MarkAttendance', {
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
          seterror({
            error: true,
            errorMessage: error.response.data.message,
          });
          // alert(error.response.data.message);
        });
    } catch (error) {
      seterror({
        error: true,
        errorMessage: "error marking attendance,please try again.",
      });
    }
    setloading(false);
    setTimeout(() => {
      seterror({
        error: false,
        errorMessage: "",
      });
    }, 5000); // Changes state after 5 seconds
  };


  return (
    <div>
      <div className="container w-[90vw]">
        <div className="box">
          <div className="haha">
            <img className="" src={myImg} alt="Logo" />
            <div className="heading mt-3 pb-0 mb-0">Mark Attendance</div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column" style={{ marginTop: '1.3rem' }}>
            <form id="attendanceform" onSubmit={handleSubmit} method="post" style={{ width: '100%' }}>
              <input
                id="code"
                className="form-control input-field"
                placeholder="Enter code here"
                name="code"
                value={inputCode}
                onChange={(event) => setInputCode(event.target.value)}
                required
                maxLength={9}
              />
              {isError.error && <div className="text-red-500 mt-1 text-center">{isError.errorMessage}</div>}
              <button id="submitBtn" type="submit" className="submit-button btn btn hover:bg-black flex justify-center items-center">
                {loading ? <img src="/loader.svg" alt="Loading..." className="w-10 h-10 relative bottom-[6px] inline"></img> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <DeveloperDay />
      </div>
    </div>
  );
}
export default AttendanceForm;

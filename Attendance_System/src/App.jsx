import { Routes, Route } from 'react-router-dom'
import AttendanceForm from './components/attendanceInfo.jsx'
import SuccessMessage from './components/success.jsx'
import NotFoundPage from './components/No_Found.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<AttendanceForm />}></Route>
      <Route path="/success" element={<SuccessMessage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default App

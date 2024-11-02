import { Routes, Route } from 'react-router-dom'
import AttendanceForm from './components/attendanceInfo'
import SuccessMessage from './components/success'
import NotFoundPage from './components/No_Found'
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

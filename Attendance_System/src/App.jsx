import { Routes,Route } from 'react-router-dom'
import AttendanceForm from './components/attedanceInfo'


function App() {
  
  return (
    <Routes>
      <Route path="/form" element={<AttendanceForm/>}></Route>
    </Routes>
  )
}

export default App

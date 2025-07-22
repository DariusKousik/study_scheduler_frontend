import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'
import Scheduler from './Pages/Scheduler'
import Profile from './Pages/Profile'
import Progress from './Pages/Progress'
import './App.css'

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar></Navbar>
        <div className="p-4">
          <Routes>
            <Route path='/' element={<Dashboard></Dashboard>}></Route>
            <Route path='/Scheduler' element={<Scheduler></Scheduler>}></Route>
            <Route path='/Progress' element={<Progress></Progress>}></Route>
            <Route path='/Profile' element={<Profile></Profile>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

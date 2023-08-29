import React from 'react'
import Navbar from './Navbar'
import AddNote from './AddNote'
import About from './About'
import {BrowserRouter as Router,Routes,Route,Outlet} from 'react-router-dom'
const Home = () => {
  return (
    <div>
          <Navbar/>
          <Outlet/>
          {/* <Routes>
            <Route path='/home' element={<AddNote/>}></Route>
            <Route path='/about' element={<About/>}></Route>
          </Routes> */}
    </div>
  )
}

export default Home

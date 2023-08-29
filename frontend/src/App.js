import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Notestate from './Context/Notestate'
import AddNote from './Components/AddNote'
import About from './Components/About'
import Services from './Components/Servicse'
import Contact from './Components/Contact'
const App = () => {
  return (
    <>
      <Notestate>
        <Router>
          <Routes>
            <Route index path='/' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}>
              <Route index element={<AddNote/>}></Route>
              <Route path='about' element={<About/>}/>
              <Route path='services' element={<Services/>}/>
              <Route path='contact' element={<Contact/>}/>
             </Route>
            <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
        </Router>
      </Notestate>
    </>
  )
}

export default App

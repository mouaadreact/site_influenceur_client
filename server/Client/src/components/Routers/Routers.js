import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from '../Home/Home'
import NavBar from '../NavBar/NavBar'
import Login from '../Login/Login'
import Register from '../Register/Register'


function Routers() {
  return (
   <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
        </Routes>
     </BrowserRouter>
  )
}

export default Routers
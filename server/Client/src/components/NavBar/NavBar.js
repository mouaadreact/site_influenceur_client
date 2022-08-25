import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import {NavLink} from 'react-router-dom'
import {UidContext}  from '../../contexts/AppContext'
function NavBar() { 
  const id=useContext(UidContext);

 return (
  <>
     {
      id 
      ?
       <></>
      :
      <nav className=" bg-dark navbar navbar-light navbar-expand-md py-3" 
  style={{position:"sticky",top:"0",right:"0",zIndex:"100",width:"100%"}}>
   <div className="container">
    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
      <span className="visually-hidden">Toggle navigation</span>
      <span className="navbar-toggler-icon"></span>
    </button>
       <div 
        className="collapse navbar-collapse" 
        id="navcol-3" 
        style={{height:"33px",marginBottom:"0"}}>
        <span 
         className="navbar-text" 
         style={{marginLeft:"14px",fontWeight:"bold",fontFamily:"Ubuntu",fontSize:"18px",color:"white"}}
        >
       <span className="logo"></span>Influenceur</span>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink  to="/" className="nav-NavLink" style={{fontFamily:"Ubuntu",fontWeight:"bold",color:"white"}}>Acceuil</NavLink>
            </li>  
          </ul>
          <NavLink  to="/login" className="Buttons log" >Login</NavLink>
          <NavLink  to="/register" className="Buttons reg">Registre</NavLink>
       </div>
   </div>
</nav>

     }
   </>
 )
}

export default NavBar
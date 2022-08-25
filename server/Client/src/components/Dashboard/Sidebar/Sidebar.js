import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../../redux/actions/auth.actions';

function Sidebar() {

  const dispatch=useDispatch();
   
  const handleLogout= async (e)=>{
    e.preventDefault();
    authLogout(dispatch);
   } 

  return (
  <div className="bg-white" id="sidebar-wrapper">
    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
            className="fas fa-user-secret me-2"></i>InfluenceurSite</div>
    <div className="list-group list-group-flush my-3">
        <NavLink  to="/dashboard/home" className="list-group-item list-group-item-action bg-transparent second-text">Dashboard</NavLink>
        <NavLink to="/dashboard/client" className="list-group-item list-group-item-action bg-transparent second-text ">Client</NavLink>
        <NavLink to="/dashboard/" className="list-group-item list-group-item-action bg-transparent second-text ">Profil</NavLink>
        <NavLink to="/dashboard/" className="list-group-item list-group-item-action bg-transparent second-text ">Statistics</NavLink>
        <NavLink to="/dashboard/" className="list-group-item list-group-item-action bg-transparent second-text ">Setting</NavLink>
        
        <NavLink
         to=""
         onClick={(e) => handleLogout(e)}
         className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
        Logout
        </NavLink>
    </div>
  </div>

  )
}

export default Sidebar
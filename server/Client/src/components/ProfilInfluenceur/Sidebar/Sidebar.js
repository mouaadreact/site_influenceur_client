import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogout } from "../../../redux/actions/auth.actions";
import { UidContext } from "../../../contexts/AppContext";

//!--------------------------------------------------------
function Sidebar() {
  const dispatch = useDispatch();
  const id = useContext(UidContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    authLogout(dispatch);
  };

  return (
    <div 
    className="bg-white" 
    style={{ boxShadow:"rgb(0, 0, 0) 1px 0px 15px",zIndex:"1"}}
    id="sidebar-wrapper">
      <div
      style={{
        color:"rgb(127, 123, 123)"
        }}
      className="sidebar-heading text-center py-4  fs-4 fw-bold text-uppercase border-bottom">
        <i 
        className="fas fa-user-secret me-2"
        ></i>3<span style={{color:"#EB6E35"}}>WDEV</span>
      </div>
      <div className="list-group list-group-flush my-3">
        <NavLink
          to="/profil/home"
          className="list-group-item list-group-item-action  second-text"
        >
          Profil
        </NavLink>
        <NavLink
          to={`/profil/edit/${id}`}
          className="list-group-item list-group-item-action  second-text"
        >
          Edit Profil
        </NavLink>
        <NavLink
          to="/profil/newOffre"
          className="list-group-item list-group-item-action  second-text"
        >
          New Offre
        </NavLink>
        <NavLink
          to="/profil/historyOffre"
          className="list-group-item list-group-item-action second-text"
        >
          History Offre
        </NavLink>
        <NavLink
          to="/login"
          onClick={(e) => handleLogout(e)}
          className="list-group-item list-group-item-action  primary-text"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;

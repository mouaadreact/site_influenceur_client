import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogout } from "../../redux/actions/auth.actions";
import Sidebar from "./Sidebar/Sidebar";
import Profil from "./Profil/Profil";
import Footer from "../Footer/Footer";

function ProfilInfluenceur() {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    authLogout(dispatch);
  };

  return (
    <div className="d-flex" 
    id="wrapper" 
    style={{
      background:"#EB6E35",
      fontFamily:"poppins",
      fontSize:"15px"
      }}
    >
      <Sidebar />
      <Profil />
    </div>
  );
}

export default ProfilInfluenceur;

import React, { useContext, useEffect } from "react";
import "./Style/Admin.css";
import { useDispatch } from "react-redux";

import Sidebar from "./Sidebar/Sidebar";
import Statistics from "./Statistics/Statistics";
import isAuth from "../../utils/Auth";

function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuth().status){
    let el = document.getElementById("wrapper");
    let toggleButton = document.getElementById("menu-toggle");
    toggleButton.onclick = function () {
      el.classList.toggle("toggled");
    };
  }
  }, []);


  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Statistics />
    </div>

  );
}

export default Admin;

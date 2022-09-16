import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "./Table";

function Langue() {
  const fieldsTable = ["Langue"];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Langue" fieldsTable={fieldsTable} />
    </div>
  );
}

export default Langue;

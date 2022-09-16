import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "./Table";

function Client() {
  const fieldsTable = [" Raison sociale", "Nom directeur", "telephone" ,"email","Etat"];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Client" fieldsTable={fieldsTable} />
    </div>
  );
}

export default Client;

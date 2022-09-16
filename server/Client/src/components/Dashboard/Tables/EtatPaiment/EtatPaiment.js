import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "./Table";

function EtatPaiment() {
  const fieldsTable = [
    "Campagne ID",
    "Influenceur ID",
    "Date Reglement",
    "Tarif",
  ];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Etat Paiment" fieldsTable={fieldsTable} />
    </div>
  );
}

export default EtatPaiment;

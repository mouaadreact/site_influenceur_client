import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "./Table";

function EtatPaiment() {
  const fieldsTable = [
    "Campagne Titre",
    "Influenceur Username Instagram",
    "Date Reglement",
    "Tarif",
    "Currency"
  ];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Etat Paiment" fieldsTable={fieldsTable} />
    </div>
  );
}

export default EtatPaiment;

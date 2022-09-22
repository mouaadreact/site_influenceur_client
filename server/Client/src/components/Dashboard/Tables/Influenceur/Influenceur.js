import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import FilterSidebar from "./FilterSidebar";
import Table from "./Table";

function Influenceur() {
  const fieldsTable = [
    "Nom",
    "Prenom",
    "Username Instagram",
    "Commentaire",
    "Etat Compte",
  ];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Influenceur" fieldsTable={fieldsTable} />
      <FilterSidebar />
    </div>
  );
}

export default Influenceur;

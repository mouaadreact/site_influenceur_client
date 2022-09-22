import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "./Table";

function Offre() {
  const fieldsTable = ["Campagne Titre", "Influenceur Username Instagram","Date d'invitation", "Status"];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Offre" fieldsTable={fieldsTable} />
    </div>
  );
}

export default Offre;

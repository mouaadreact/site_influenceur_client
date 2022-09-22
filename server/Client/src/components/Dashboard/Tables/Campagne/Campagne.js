import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import FilterSidebar from "./FilterSidebar";
import Table from "./Table";

function Campagne() {
  const fieldsTable = [
    "Titre",
    "Date debut",
    "Date fin",
    "Nombre influenceur",
    "Status",
  ];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="Campagne" fieldsTable={fieldsTable} />
      <FilterSidebar />
    </div>
  );
}

export default Campagne;

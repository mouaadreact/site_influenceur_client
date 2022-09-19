import React, { useContext } from "react";
import { UidContext } from "../../../contexts/AppContext";
import Sidebar from "../Sidebar/Sidebar";
import Table from "./Table"; 

function HistoryOffre() {
  const id = useContext(UidContext);

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <Table name="History Offre" id={id} />
    </div>
  );
}

export default HistoryOffre;

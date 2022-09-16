import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import ViewGalerieCampagne from "./ViewGalerieCampagne";

function GalerieCampagne() {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <ViewGalerieCampagne />
    </div>
  );
}

export default GalerieCampagne;

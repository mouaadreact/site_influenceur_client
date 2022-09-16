import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import AddCampagneForm from "./AddCampagneForm";
function AddCampagne() {
  return (
    <>
      <div className="d-flex" id="wrapper">
        <Sidebar/>
        <AddCampagneForm />
      </div>
    </>
  );
}

export default AddCampagne;

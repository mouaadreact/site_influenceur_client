import React from "react";
import AddCampagneForm from "./AddCampagneForm";
import FilterInfluenceur from "./FilterInfluenceur";
function AddCampagne() {
  return (
    <>
     <div className="d-flex" id="wrapper">
          <AddCampagneForm />
          <FilterInfluenceur/>
        
      </div>
    </>
  );
}

export default AddCampagne;

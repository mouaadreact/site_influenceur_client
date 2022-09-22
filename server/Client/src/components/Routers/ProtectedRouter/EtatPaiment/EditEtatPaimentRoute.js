import React from "react";
import isAuth from "../../../../utils/Auth";
import EditEtatPaiment from "../../../Dashboard/Tables/EtatPaiment/EditEtatPaiment";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function EditEtatPaimentRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <EditEtatPaiment/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default EditEtatPaimentRoute;

import React from "react";
import isAuth from "../../../../utils/Auth";
import AddEtatPaiment from "../../../Dashboard/Tables/EtatPaiment/AddEtatPaiment";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function AddEtatPaimentRoute() { 
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <AddEtatPaiment/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };
  return <>{Authorization()}</>;
}

export default AddEtatPaimentRoute;

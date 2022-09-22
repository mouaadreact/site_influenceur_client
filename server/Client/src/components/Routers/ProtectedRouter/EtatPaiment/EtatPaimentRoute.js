import React from "react";

import isAuth from "../../../../utils/Auth";
import EtatPaiment from "../../../Dashboard/Tables/EtatPaiment/EtatPaiment";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function EtatPaimentRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <EtatPaiment/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default EtatPaimentRoute;

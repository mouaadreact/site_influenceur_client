import React from "react";

import isAuth from "../../../../utils/Auth";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import EditProfil from "../../../ProfilInfluenceur/EditProfil/EditProfil";
import PageRole from "../../../PageNotFound/PageRole";

function EditProfilRoute() {
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <EditProfil/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };


  return <>{Authorization()}</>;
}

export default EditProfilRoute;

import React from "react";

import isAuth from "../../../../utils/Auth";
import EditInfluenceur from "../../../Dashboard/Tables/Influenceur/EditInfluenceur";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function EditInfluenceurRoute() {
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <EditInfluenceur/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default EditInfluenceurRoute;

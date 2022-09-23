import React from "react";

import isAuth from "../../../../utils/Auth";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import ProfilInfluenceur from "../../../ProfilInfluenceur/ProfilInfluenceur";
import PageRole from "../../../PageNotFound/PageRole";

function ProfilHomeRoute() {
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <ProfilInfluenceur/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };


  return <>{Authorization()}</>;
}

export default ProfilHomeRoute;

import React from "react";
import isAuth from "../../../../utils/Auth";

import PageForbidden from "../../../PageNotFound/PageForbidden";
import HistoryOffre from "../../../ProfilInfluenceur/HistoryOffre/HistoryOffre";
import PageRole from "../../../PageNotFound/PageRole";

function ProfilHistoryOffreRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <HistoryOffre/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };


  return <>{Authorization()}</>;
}

export default ProfilHistoryOffreRoute;

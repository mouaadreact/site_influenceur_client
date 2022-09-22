import React from "react";
import isAuth from "../../../../utils/Auth";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import NewOffre from "../../../ProfilInfluenceur/NewOffre/NewOffre";
import PageRole from "../../../PageNotFound/PageRole";

function ProfilNewOffreRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <NewOffre/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };


  return <>{Authorization()}</>;
}

export default ProfilNewOffreRoute;

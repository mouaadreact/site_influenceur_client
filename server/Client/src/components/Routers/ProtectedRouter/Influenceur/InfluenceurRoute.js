import React from "react";
import isAuth from "../../../../utils/Auth";
import Influenceur from "../../../Dashboard/Tables/Influenceur/Influenceur";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function InfluenceurRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <Influenceur/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };
  return <>{Authorization()}</>;
}

export default InfluenceurRoute;

import React from "react";
import isAuth from "../../../../utils/Auth";
import GalerieCampagne from "../../../Dashboard/Tables/GalerieCampagne/GalerieCampagne";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function GalerieCampagneRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <GalerieCampagne/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default GalerieCampagneRoute;

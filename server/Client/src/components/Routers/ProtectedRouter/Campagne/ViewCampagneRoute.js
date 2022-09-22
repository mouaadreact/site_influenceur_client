import React from "react";
import isAuth from "../../../../utils/Auth";
import ViewCampagne from "../../../Dashboard/Tables/Campagne/ViewCampagne";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function ViewCampagneRoute() {

  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <ViewCampagne/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default ViewCampagneRoute;

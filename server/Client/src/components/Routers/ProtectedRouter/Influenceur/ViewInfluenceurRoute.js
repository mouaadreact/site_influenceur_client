import React from "react";

import isAuth from "../../../../utils/Auth";
import ViewInfluenceur from "../../../Dashboard/Tables/Influenceur/ViewInfluenceur";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function ViewInfluenceurRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <ViewInfluenceur/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default ViewInfluenceurRoute;

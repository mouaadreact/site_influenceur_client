import React from "react";
import isAuth from "../../../../utils/Auth";

import Client from "../../../Dashboard/Tables/Client/Client";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function ClientRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <Client/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };
  return <>{Authorization()}</>;
}

export default ClientRoute;

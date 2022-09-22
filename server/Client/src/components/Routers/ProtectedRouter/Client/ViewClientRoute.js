import React from "react";
import isAuth from "../../../../utils/Auth";
import ViewClient from "../../../Dashboard/Tables/Client/ViewClient";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function ViewClientRoute() {
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <ViewClient/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };
  return <>{Authorization()}</>;
}

export default ViewClientRoute;

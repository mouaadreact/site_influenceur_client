import React from "react";

import isAuth from "../../../utils/Auth";
import Admin from "../../Dashboard/Admin";
import PageForbidden from "../../PageNotFound/PageForbidden";
import PageRole from "../../PageNotFound/PageRole";

function AdminRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <Admin/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default AdminRoute;

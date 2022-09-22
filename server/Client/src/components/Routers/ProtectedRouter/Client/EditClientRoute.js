import React from "react";
import isAuth from "../../../../utils/Auth";

import EditClient from "../../../Dashboard/Tables/Client/EditClient";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function EditClientRoute() {
 

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <EditClient/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default EditClientRoute;

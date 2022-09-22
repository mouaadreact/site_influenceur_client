import React from "react";
import isAuth from "../../../../utils/Auth";
import AddClient from "../../../Dashboard/Tables/Client/AddClient";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function AddClientRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <AddClient/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default AddClientRoute;

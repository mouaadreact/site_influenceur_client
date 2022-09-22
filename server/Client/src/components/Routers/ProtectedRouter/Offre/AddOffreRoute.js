import React from "react";

import isAuth from "../../../../utils/Auth";
import AddOffre from "../../../Dashboard/Tables/Offre/AddOffre";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function AddOffreRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <AddOffre/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default AddOffreRoute;

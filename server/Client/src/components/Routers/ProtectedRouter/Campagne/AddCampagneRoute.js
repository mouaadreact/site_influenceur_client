import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../../contexts/AppContext";
import { getOneUser } from "../../../../redux/actions/user.actions";
import isAuth from "../../../../utils/Auth";
import AddCampagne from "../../../Dashboard/Tables/Campagne/AddCampagne";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function AddCampagneRoute() {

  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="admin"){
         return <AddCampagne/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

  return <>{Authorization()}</>;
}

export default AddCampagneRoute;

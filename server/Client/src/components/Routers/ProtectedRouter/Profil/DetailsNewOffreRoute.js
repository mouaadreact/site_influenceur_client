import React from 'react'
import DetailsNewOffre from '../../../ProfilInfluenceur/NewOffre/DetailsNewOffre';
import isAuth from "../../../../utils/Auth";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function DetailsNewOffreRoute() {
 
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <DetailsNewOffre/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };


return <>{Authorization()}</>;

}

export default DetailsNewOffreRoute
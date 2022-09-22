import React from 'react'
import DetailsHistoryOffre from '../../../ProfilInfluenceur/HistoryOffre/DetailsHistoryOffre';
import isAuth from "../../../../utils/Auth";
import PageForbidden from "../../../PageNotFound/PageForbidden";
import PageRole from "../../../PageNotFound/PageRole";

function DetailsHistoryOffreRoute() {
  
  const Authorization = () => {
    if(isAuth().status){
       if(isAuth().role==="influenceur"){
         return <DetailsHistoryOffre/>
       }else{
         return <PageRole/>
       }
    }else{
      return <PageForbidden/>
    }
  };

return <>{Authorization()}</>;

}

export default DetailsHistoryOffreRoute
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampagne } from "../../../redux/actions/campagne.actions";
import { getAllGalerieCampagne } from "../../../redux/actions/galerieCampagne.actions";
import { getOneInfluenceurUserId } from "../../../redux/actions/influenceur.actions";
import { 
  getOffreAccepter, 
} from "../../../redux/actions/offre.actions";
import dateformat from "dateformat";

function Table({ id ,name }) {
  const dispatch = useDispatch();
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);
  const { historyOffreData } = useSelector((state) => state.offre);
  const { allCampagneData } = useSelector((state) => state.campagne);
  const { allGalerieCampagneData } = useSelector(
    (state) => state.galerieCampagne
  );

  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
    getAllCampagne(dispatch);
    getAllGalerieCampagne(dispatch);
  }, [id]);

  useEffect(() => {
    if (oneInfluenceurData?.id !== undefined) {
    getOffreAccepter(oneInfluenceurData?.id, dispatch);
    }
  }, [oneInfluenceurData?.id]);


 
  return (
    <>

      <div 
      className="container-fluid p-3"
      style={{
      background:"#EB6E35",
      fontSize:"15px"
      }}
      >
      <div 
      className="row" 
      style={{
        justifyContent:"center",
        fontSize:"15px",
        fontFamily:"'Poppins', sans-serif"
        }}>
     
      <div className="col-lg-8">
      {historyOffreData?.map((row, index) => {
        return (
        <div className="card mb-4" key={index}>
          <div className="card-body">


            <div className="row">
              <div 
              className="col-sm-3 w-100 mb-2"
               style={{ 
                display:"flex",
                justifyContent:"space-between"
               }}
              >
                <b className="mb-0">{row.titre.toUpperCase()}</b>
                <p 
                  className="bg-info p-1 rounded text-center white-text"
                  style={{
                    fontWeight: "bold",  
                    width:"100px",
                    margin: "0"
                    }}
                >
             {row.status}
             </p>
              </div>
            </div>
           

            <div className="row">
              <div className="col-sm-3 w-100 mb-1">
                <p className="text-muted mb-0">{dateformat(row.dateDebut,"yyyy/mm/dd") + " - " +dateformat(row.dateFin,"yyyy/mm/dd")} </p>
              </div>
            </div>

            
            <div className="row">
              <div className="col-sm-3 mb-1">
                <p className="mb-0">Offre: </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                {row.descriptionOffre}
                </p>
              </div>
            </div>

         
            <div className="row">
              <div className="col-sm-3 mb-2">
                <p className="mb-0">Presence:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                {row.presence == true 
                ? 
                <p
                    className="px-1 rounded white-text green-status"
                    style={{                     
                      width:"40px",
                      margin: "0", 
                    }}
                 >oui</p>
                 : <p
                    className="px-1 rounded white-text red-status"
                    style={{                       
                      width:"40px",
                      margin: "0",        
                    }}
                 >non</p>
                 }
                </p>
              </div>
            </div>


            <div className="mb-3">         
              <a 
              className="white-text p-1 rounded"
              style={{
                float:"right",
                backgroundColor:"#44e4a0",
                fontWeight:"bold",
                }} 
              href={`/profil/historyOffre/details/${id}/${row.id}`}>details</a>
            </div>
           
          </div>
        </div>
        )
      })
        }
        <div className="row"></div>
      </div>
    </div>
    
    </div>
    </>
  );
}

export default Table;

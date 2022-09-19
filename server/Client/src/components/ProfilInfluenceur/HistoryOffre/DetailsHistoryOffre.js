import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampagne } from "../../../redux/actions/campagne.actions";
import { getAllGalerieCampagne } from "../../../redux/actions/galerieCampagne.actions";
import { getOneInfluenceurUserId } from "../../../redux/actions/influenceur.actions";
import {
  getOffreAccepter, 
} from "../../../redux/actions/offre.actions";
import dateformat from "dateformat";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router";

function DetailsHistoryOffre() {
  const dispatch = useDispatch();
  const params = useParams();
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);
  const { loading, historyOffreData } = useSelector((state) => state.offre);
  const { allCampagneData } = useSelector((state) => state.campagne);
  const { allGalerieCampagneData } = useSelector(
    (state) => state.galerieCampagne
  );

  useEffect(() => {
    getOneInfluenceurUserId(params.idUser, dispatch);
    getAllCampagne(dispatch);
    getAllGalerieCampagne(dispatch);
  }, []);

  useEffect(() => {
    if (oneInfluenceurData?.id !== undefined) {
    getOffreAccepter(oneInfluenceurData?.id, dispatch);
    }
  }, [oneInfluenceurData?.id]);


 
  return (
    <>
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div className="container-fluid p-3">
      <div 
      className="row" 
      style={{
        justifyContent:"center",
        fontSize:"15px",
        fontFamily:"'Poppins', sans-serif"
        }}>
     
      <div className="col-lg-8">
      {historyOffreData?.map((row, index) => {
        if(params.idOffre==row.id){
        return (
        <div className="card mb-4">
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
                  className="bg-info p-1 rounded text-center"
                  style={{
                    color: "#FFF",
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
                    className="px-1 rounded white-text green-btn"
                    style={{                     
                      width:"40px",
                      margin: "0", 
                    }}
                 >oui</p>
                 : <p
                    className="px-1 rounded white-text red-btn"
                    style={{                       
                      width:"40px",
                      margin: "0",        
                    }}
                 >non</p>
                 }
                </p>
              </div>
            </div>

           
            <div className="row">
              <div className="col-sm-3 mb-1">
                <p className="mb-0">hashtages:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                {row.hashtags}
                </p>
              </div>
            </div>

           
            <div className="row">
              <div className="col-sm-3 mb-1">
                <p className="mb-0">compte tagger:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                {row.compteTagger}
                </p>
              </div>
            </div>
            
            
            <div className="row">
              <div className="col-sm-3 mb-1">
                <p className="mb-0">Interets:</p>
              </div>
              <div className="col-sm-9">
                {allCampagneData?.map((ele, index) => {
                          if (ele.id === row.CampagneId) {
                            return (
                              <p className="text-muted mb-0" key={index}>
                                {ele?.Interets?.map((itr) => {
                                  return itr.interetNom;
                                }).toString()}
                              </p>
                            );
                          }
                        })}
                
              </div>
            </div>

           
            <div className="lightbox">
                        <div className="multi-carousel">
                          <div className="multi-carousel-inner">
      
                            <div className="multi-carousel-item">
                             
                              {allGalerieCampagneData?.map((ele, index) => {
                                if (ele.CampagneId === row.CampagneId) {
                                  return (
                                    <img
                                      key={index}
                                      style={{
                                        width:"200px",
                                        marginLeft:"10px",
                                        marginBottom:"10px"
                                        }}
                                      
                                      src={ele.image}
                                      alt="error can show image"
                                    />
                                  );
                                }
                              })
                              
                              }
                            </div>
                          </div>
                        </div>
                      </div>            

            
           
          </div>
        </div>
        )}
      })
        }
        <div className="row"></div>
      </div>
    </div>
    </div>
        
     </div>   
    </>
  );
}

export default DetailsHistoryOffre;

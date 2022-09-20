import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneInfluenceurUserId } from "../../../redux/actions/influenceur.actions";
import {
  AccepterOffre,
  DontShowOffre,
  getNewOffre,
  RefuserOffre,
} from "../../../redux/actions/offre.actions";
import dateformat from "dateformat";
import { getAllCampagne } from "../../../redux/actions/campagne.actions";
import { getAllGalerieCampagne } from "../../../redux/actions/galerieCampagne.actions";


//?-***************************
 
function Table({ name, fieldsTable, id }) {
  const dispatch = useDispatch();
  
  //* select state from redux: 
  const { loading, newOffreData } = useSelector((state) => state.offre);
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);
  const { allCampagneData } = useSelector((state) => state.campagne);
  const { allGalerieCampagneData } = useSelector(
    (state) => state.galerieCampagne
  );

  //*fetch data:
  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
    getAllCampagne(dispatch);
    getAllGalerieCampagne(dispatch);
  }, [id]);

  useEffect(() => {
    if (oneInfluenceurData?.id !== undefined) {
      getNewOffre(oneInfluenceurData?.id, dispatch);
    }
  }, [oneInfluenceurData?.id]);

  //*=======================================
  const handleChangeAccepter = (e, idCampagne) => {
    if (oneInfluenceurData?.id) {
      e.preventDefault();
      AccepterOffre(idCampagne, oneInfluenceurData?.id, dispatch);
    }
  };

  const handleChangeRefuser = (e, idCampagne) => {
    if (oneInfluenceurData?.id) {
      e.preventDefault();
      RefuserOffre(idCampagne, oneInfluenceurData?.id, dispatch);
    }
  };

  const handleChangeDontShow = (e, idCampagne) => {
    if (oneInfluenceurData?.id) {
      e.preventDefault();
      DontShowOffre(idCampagne, oneInfluenceurData?.id, dispatch);
    }
  };

  return (
    <>
      <div 
      className="container-fluid p-3" 
      style={{
      background:"#EB6E35",
      fontSize:"15px"
      }}>
      <div 
      className="row" 
      style={{
        justifyContent:"center",
        fontSize:"15px",
        fontFamily:"'Poppins', sans-serif"
        }}>
     
      <div className="col-lg-8">
      {newOffreData?.map((row, index) => {
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
                  className={
                    "p-1 rounded text-center white-text " + 
                    (row.status==="En cours traitement" ? "yellow-status" : "bleu-status")
                    }
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


            {row.status == "En cours traitement" ? (
                        <div className="mb-3">
                          <label style={{ marginRight: "10px" }}>
                            Actions :{" "}
                          </label>

                          <a
                            onClick={(e) =>
                              handleChangeAccepter(e, row.CampagneId)
                            }
                            className="green-btn  p-1 rounded"
                            style={{ marginRight: "10px" }}
                          >
                            Accepter
                          </a>

                          <a
                            onClick={(e) =>
                              handleChangeRefuser(e, row.CampagneId)
                            }
                            className="red-btn p-1 rounded"
                          >
                            Refuser
                          </a>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label style={{ marginRight: "10px" }}>
                            Actions :{" "}
                          </label>

                          <a
                            onClick={(e) =>
                              handleChangeDontShow(e, row.CampagneId)
                            }
                            className="bleu-btn p-1 rounded"
                            style={{ marginRight: "10px" }}
                          >
                            Dont show
                          </a>
                        </div>
                      )}



            <div className="mb-3">         
              <a 
              className="white-text p-1 rounded"
              style={{
                float:"right",
                backgroundColor:"#44e4a0",
                fontWeight:"bold",
                }} 
              href={`/profil/newOffre/details/${id}/${row.id}`}>details</a>
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

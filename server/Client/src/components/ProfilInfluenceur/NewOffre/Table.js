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

function Table({ name, fieldsTable, id }) {
  const dispatch = useDispatch();
  const { loading, newOffreData } = useSelector((state) => state.offre);
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);

  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
  }, [id]);

  useEffect(() => {
    getNewOffre(oneInfluenceurData?.id, dispatch);
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

      <div className="container-fluid p-3">
      <div className="container mt-3 w-75 mb-5">
        <div className="row">
          <div className="col-md-12">
           {
            newOffreData?.map((row,index)=>{
            return(
              <div className="card mt-4">
              <div className="card-body">
              <div className="mb-3">
                  <label>Offre </label>
                  <p className="form-control ">
                    {index+1}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne titre </label>
                  <p className="form-control ">
                    {row.titre}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Date de debut </label>
                  <p className="form-control ">
                  {dateformat(row.dateDebut, "dd/mm/yyyy")}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Date de fin </label>
                  <p className="form-control ">
                  {dateformat(row.dateFin, "dd/mm/yyyy")}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Nombre des influenceurs</label>
                  <p className="form-control ">
                  {row.nombreInfluenceur}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne description offre </label>
                  <p className="form-control ">
                  {row.descriptionOffre}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Presence</label>
                  <p className="form-control ">
                  {row.presence == true ? "oui" : "non"}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Hashtage utilisé </label>
                  <p className="form-control ">
                  {row.hashtags}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Compte tagger utilisé </label>
                  <p className="form-control ">
                  {row.compteTagger}
                  </p>
                </div>
                
                <div className="mb-3">
                  <label>Status</label>
                  <p 
                  className={"form-control "+(row.status=="En cours traitement"?"bg-warning":"bg-info")} 
                  style={{
                    color:"#FFF",
                    fontWeight:"bold"
                    }}>
                  {row.status}
                  </p>
                </div>

                {
                  row.status=="En cours traitement"
                  ?
                  (
                    <div className="mb-3">
                  <label style={{marginRight:"10px"}}>Actions : </label>
                  
                  <a
                          onClick={(e) =>
                            handleChangeAccepter(e, row.CampagneId)
                          }
                          className="btn btn-success"
                          style={{ marginRight: "10px" }}
                        >
                          Accepter
                        </a>

                        <a
                          onClick={(e) =>
                            handleChangeRefuser(e, row.CampagneId)
                          }
                          className="btn btn-danger"
                        >
                          Refuser
                        </a>

                </div>

                  )
                  :
                  (
                    <div className="mb-3">
                  <label style={{marginRight:"10px"}}>Actions : </label>
                  
                  <a
                          onClick={(e) =>
                            handleChangeDontShow(e,row.CampagneId)
                          }
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          Dont show
                        </a>  

                </div>

                  )
                }

              </div>
            </div>
            )

            })
           }
 
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneInfluenceurUserId } from "../../../redux/actions/influenceur.actions";
import {
  getNewOffre,
  getOffreAccepter, 
} from "../../../redux/actions/offre.actions";

function Table({ name, fieldsTable, id }) {
  const dispatch = useDispatch();
  const { loading, historyOffreData } = useSelector((state) => state.offre);
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);

  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
  }, [id]);

  useEffect(() => {
    getOffreAccepter(oneInfluenceurData?.id, dispatch);
  }, [oneInfluenceurData?.id]);

  return (
    <>
      <div className="container-fluid px-4">
        <div className="row my-5">
          <div className="card-hearder mb-3">
            <h4>{name + ":"}</h4>
          </div>

          <div className="col">
            <div className="d-flex justify-content-center">
              <div class="row">
                {historyOffreData?.map((ele, index) => {
                  return (
                    <div class="col-sm-9 mb-4" style={{ width: "900px" }}>
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            <span className="text-success">
                              Offre :{" "}
                              {index + 1 < 10 ? "0" + (index + 1) : index + 1}{" "}
                            </span>
                          </h5>
                          <p class="card-text">Campagne Name : {ele.titre}</p>
                          <p class="card-text">
                            Description Offre : {ele.descriptionOffre}
                          </p>
                          <p class="card-text">Date debut : {ele.dateDebut} </p>
                          <p class="card-text">Date Fin : {ele.dateFin} </p>
                          <span>Status: </span>
                          <a
                            class="btn btn-success"
                            style={{ marginRight: "10px" }}
                          >
                            {ele.status}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;

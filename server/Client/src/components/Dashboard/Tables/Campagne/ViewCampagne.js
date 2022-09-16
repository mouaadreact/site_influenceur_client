import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCampagne } from "../../../../redux/actions/campagne.actions";
import dateformat from "dateformat";
import Sidebar from "../../Sidebar/Sidebar";

function ViewCampagne() {
  const dispatch = useDispatch();
  const { loading, oneCampagneData } = useSelector((state) => state.campagne);
  const { interetCampagneData } = useSelector((state) => state.interet);
  const params = useParams();

  useEffect(() => {
    getOneCampagne(params.id, dispatch);
  }, []);

  return (
    <div className="d-flex" id="wrapper">
    <Sidebar />
    <div className="container-fluid px-4">
      <div className="container mt-5 w-100 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Client View Details
                  <a
                    href="/dashboard/campagne"
                    className="btn btn-danger float-end"
                  >
                    BACK
                  </a>
                </h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label>Campagne ID</label>
                  <p className="form-control ">
                    {oneCampagneData.id}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Client ID</label>
                  <p className="form-control ">
                    {oneCampagneData.ClientId}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne titre </label>
                  <p className="form-control ">
                    {oneCampagneData.titre}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne date de debut </label>
                  <p className="form-control ">
                    {dateformat(oneCampagneData.dateDebut, "dd/mm/yyyy")}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne date de fin </label>
                  <p className="form-control ">
                    {dateformat(oneCampagneData.dateFin, "dd/mm/yyyy")}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne nombre des influenceurs</label>
                  <p className="form-control ">
                    {oneCampagneData.nombreInfluenceur < 10
                      ? "0" + oneCampagneData.nombreInfluenceur
                      : oneCampagneData.nombreInfluenceur}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne description offre </label>
                  <p className="form-control ">
                    {oneCampagneData.descriptionOffre}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Presence</label>
                  <p className="form-control ">
                    {oneCampagneData.presence == true ? "oui" : "non"}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne hashtage utilisé </label>
                  <p className="form-control ">
                    {oneCampagneData.hashtags}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Campagne compte tagger utilisé </label>
                  <p className="form-control ">
                    {oneCampagneData.compteTagger}
                  </p>
                </div>
                <div className="mb-3">
                  <label>Centret d'interet </label>
                  {oneCampagneData.Interets?.map((ele, index) => {
                    return (
                      <p key={index + 1} className="form-control ">
                        {ele.interetNom}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ViewCampagne;

import React, { useContext, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { getCountCampagne } from "../../../redux/actions/campagne.actions";
import { useDispatch, useSelector } from "react-redux";
import { getCountOffre } from "../../../redux/actions/offre.actions";
import { getCountInfluenceur } from "../../../redux/actions/influenceur.actions";
import { getCountClient } from "../../../redux/actions/client.actions";
import { UidContext } from "../../../contexts/AppContext";
import { getOneUser } from "../../../redux/actions/user.actions";
import ClientStatistics from "./Client/ClientStatistics";

function Statistics() {
  const id = useContext(UidContext);
  const dispatch = useDispatch();

  const { countCampagne } = useSelector((state) => state.campagne);
  const { countClient } = useSelector((state) => state.client);
  const { countOffre } = useSelector((state) => state.offre);
  const { countInfluenceur } = useSelector((state) => state.influenceur);
  const { oneUserData } = useSelector((state) => state.user);

  useEffect(() => {
    getCountCampagne(dispatch);
    getCountOffre(dispatch);
    getCountClient(dispatch);
    getCountInfluenceur(dispatch);
  }, []);

  useEffect(() => {
    getOneUser(id, dispatch);
  }, [id]);

  return (
    <div id="page-content-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
        <div className="d-flex align-items-center">
          <AiOutlineMenu
            className="fas fa-align-left primary-text fs-4 me-3 disable text-dark "
            id="menu-toggle"
          />
          <h2 className="fs-2 m-0">Dashboard</h2>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>

      </nav>

      <div className="container-fluid px-4">
        <div className="row g-3 my-2">
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">
                  {countClient < 10 ? "0" + countClient : countClient}
                </h3>
                <p className="fs-5">Client</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">
                  {countCampagne < 10 ? "0" + countCampagne : countCampagne}
                </h3>
                <p className="fs-5">Campagne</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">
                  {countInfluenceur < 10
                    ? "0" + countInfluenceur
                    : countInfluenceur}
                </h3>
                <p className="fs-5">Influenceur</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">
                  {countOffre < 10 ? "0" + countOffre : countOffre}
                </h3>
                <p className="fs-5">Offre</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <h3 className="fs-4 mb-3">Statistics</h3>
          <div className="col">
             <ClientStatistics/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;

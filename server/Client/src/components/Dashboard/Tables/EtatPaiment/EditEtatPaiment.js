import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOneEtatPaiment,
  updateEtatPaiment,
} from "../../../../redux/actions/etatPaiment.actions";
import dateformat from "dateformat";
import Sidebar from "../../Sidebar/Sidebar";

//?==========================================================
function EditEtatPaiment() {
  const dispatch = useDispatch();
  const { oneEtatPaiment } = useSelector((state) => state.etatPaiment);
  const params = useParams();

  const [inputValue, setInputValue] = useState({
    campagneId: "",
    influenceurId: "",
    tarif: "",
    dateReglement: "",
  });

  useEffect(() => {
    getOneEtatPaiment(params.campagneId, params.influenceurId, dispatch);
  }, []);

  useEffect(() => {
    setInputValue({
      campagneId: oneEtatPaiment.CampagneId,
      influenceurId: oneEtatPaiment.InfluenceurId,
      tarif: oneEtatPaiment.tarif,
      dateReglement: oneEtatPaiment.dateReglement,
    });
  }, [oneEtatPaiment.CampagneId]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    updateEtatPaiment(
      params.campagneId,
      params.influenceurId,
      inputValue,
      dispatch
    );
  };

  console.log(inputValue);

  return (
    <div className="d-flex" id="wrapper">
    <Sidebar />
    <div className="container-fluid px-4"  style={{backgroundColor:"#EB6E35"}} >
      <div className="container mt-5 w-100 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Etat Paiment Update
                  
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => handleEdit(e)}>
                  <div className="mb-3">
                    <label htmlFor="campagneId" style={{ marginRight: "10px" }}>
                      Campagne ID:
                    </label>
                    <input
                      name="campagneId"
                      id="campagneId"
                      type="text"
                      disabled={true}
                      defaultValue={oneEtatPaiment.CampagneId}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="influenceurId"
                      style={{ marginRight: "10px" }}
                    >
                      Influenceur ID:{" "}
                    </label>
                    <input
                      name="influenceurId"
                      id="influenceurId"
                      type="text"
                      disabled={true}
                      defaultValue={oneEtatPaiment.InfluenceurId}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="dateReglement">Date Reglement: </label>
                    <input
                      name="dateReglement"
                      id="dateReglement"
                      type="date"
                      className="form-control"
                      value={dateformat(inputValue.dateReglement, "yyyy-mm-dd")}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tarif" className="label-required">Tarif: </label>
                    <input
                      name="tarif"
                      id="tarif"
                      type="tarif"
                      className="form-control"
                      defaultValue={oneEtatPaiment.tarif}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="bleu-btn">
                      Update EtatPaiment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default EditEtatPaiment;

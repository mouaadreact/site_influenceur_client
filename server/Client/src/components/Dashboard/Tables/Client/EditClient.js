import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneClient,
  updateClient,
} from "../../../../redux/actions/client.actions";
import { useParams } from "react-router-dom";
import marocVille from "../../../../assets/data/marocAddress/ville.json";
import marocQuartier from "../../../../assets/data/marocAddress/quartier.json";
import Sidebar from "../../Sidebar/Sidebar";

function EditClient() {
  const dispatch = useDispatch();
  const { loading, oneClientData } = useSelector((state) => state.client);
  const params = useParams();

  const [clientInputValue, setClientInputValue] = useState({
    id: "",
    raisonSociale: "",
    pays: "",
    ville: "",
    quartier: "",
    codePostal: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    getOneClient(params.id, dispatch);
  }, []);

  useEffect(() => {
    setClientInputValue({ ...oneClientData });
  }, [oneClientData.id]);

  const handleChange = (e) => {
    e.preventDefault();
    setClientInputValue({
      ...clientInputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    updateClient(params.id, clientInputValue, dispatch);
  };

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
    <div className="container-fluid px-4" style={{backgroundColor:"#EB6E35"}}>
      <div className="container mt-5 w-100 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Client Update
                  <a
                    href="/dashboard/client"
                    className="btn red-btn float-end"
                  >
                    BACK
                  </a>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => handleEdit(e)}>
                  <div className="mb-3">
                    <input
                      name="id"
                      type="text"
                      disabled={true}
                      defaultValue={oneClientData.id}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="raisonSociale" className="label-required">raison sociale: </label>
                    <input
                      name="raisonSociale"
                      id="raisonSociale"
                      type="text"
                      className="form-control"
                      defaultValue={oneClientData.raisonSociale}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 label-required" >pays: </label>
                    <select
                      name="pays"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option hidden={true} className="text-muted">
                        Selection votre Pays
                      </option>
                      <option value="Maroc" selected={true}>
                        Maroc
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 label-required">ville: </label>
                    <select
                      name="ville"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option hidden={true} className="text-muted">
                        Selection votre ville
                      </option>
                      {marocVille["ville"].map((ele, index) => {
                        if (ele == oneClientData.ville) {
                          return (
                            <option selected={true} key={index} value={ele}>
                              {ele}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={ele}>
                              {ele}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 label-required">quartier: </label>
                    <select
                      name="quartier"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option hidden={true} className="text-muted">
                        Selection votre quartier
                      </option>
                      {console.log(clientInputValue)}
                      {marocQuartier[clientInputValue?.ville]?.map(
                        (ele, index) => {
                          if (ele == oneClientData.quartier) {
                            return (
                              <option selected={true} key={index} value={ele}>
                                {ele}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={ele}>
                                {ele}
                              </option>
                            );
                          }
                        }
                      )}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nomDirecteur" className="label-required">nom directeur: </label>
                    <input
                      name="nomDirecteur"
                      id="nomDirecteur"
                      type="text"
                      className="form-control"
                      defaultValue={oneClientData.nomDirecteur}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telephone" className="label-required">telephone: </label>
                    <input
                      name="telephone"
                      id="telephone"
                      type="text"
                      className="form-control"
                      defaultValue={oneClientData.telephone}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="label-required">email: </label>
                    <input
                      name="email"
                      id="email"
                      type="text"
                      className="form-control"
                      defaultValue={oneClientData.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <button 
                    type="submit" 
                    className="bleu-btn"
                    style={{fontSize:"14px",padding:"8px"}}
                    >
                      Update Client
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

export default EditClient;

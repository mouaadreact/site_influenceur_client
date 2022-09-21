import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../../../../redux/actions/client.actions";
import marocVille from "../../../../assets/data/marocAddress/ville.json";
import marocQuartier from "../../../../assets/data/marocAddress/quartier.json";
import Sidebar from "../../Sidebar/Sidebar";

function AddClient() {
  const dispatch = useDispatch();

  const [clientInputValue, setClientInputValue] = useState({
    raisonSociale: "",
    pays: "",
    ville: "",
    quartier: "",
    codePostal: "",
    telephone: "",
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setClientInputValue({
      ...clientInputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(clientInputValue)
    addClient(clientInputValue, dispatch);
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
                  Client Add
                 
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => handleAdd(e)}>
                  <div className="mb-3">
                    <label className="label-required" htmlFor="raisonSociale"> raison sociale: </label>
                    <input
                      name="raisonSociale"
                      id="raisonSociale"
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 label-required">pays: </label>
                    <select
                      name="pays"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option hidden={true} className="text-muted">
                        Selection votre Pays
                      </option>
                      <option value="Maroc">Maroc</option>
                    </select>
                  </div>

                  <div className="mb-3 ">
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
                        return (
                          <option key={index} value={ele}>
                            {ele}
                          </option>
                        );
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
                      {marocQuartier[clientInputValue?.ville]?.map(
                        (ele, index) => {
                          return (
                            <option key={index} value={ele}>
                              {ele}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nomDirecteur " className="label-required">nom directeur: </label>
                    <input
                      name="nomDirecteur"
                      id="nomDirecteur"
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telephone " className="label-required">telephone: </label>
                    <input
                      name="telephone"
                      id="telephone"
                      type="text"
                      className="form-control"
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
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <button 
                    type="submit" 
                    className="bleu-btn"
                    style={{fontSize:"14px",padding:"8px"}}
                    >
                      + Add Client
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

export default AddClient;

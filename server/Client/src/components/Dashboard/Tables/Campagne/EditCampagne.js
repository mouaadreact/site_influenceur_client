import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { 
  getOneCampagne,
  updateCampagne,
} from "../../../../redux/actions/campagne.actions";
import { getAllClient } from "../../../../redux/actions/client.actions";
import dateformat from "dateformat";
import Multiselect from "multiselect-react-dropdown";
import { getAllInteret } from "../../../../redux/actions/interet.actions";
import Sidebar from "../../Sidebar/Sidebar";

function EditCampagne() {
  const dispatch = useDispatch();
  const params = useParams();
  const { error,oneCampagneData } = useSelector((state) => state.campagne);
  const { allClientData } = useSelector((state) => state.client);
  const { allInteretData } = useSelector((state) => state.interet);
  const [optionsInteret, setOptionsInteret] = useState([]);
  const [interetMult, setInteretMult] = useState([]);
  const [campagneInputValue, setCampagneInputValue] = useState({
    titre: "",
    dateDebut: "",
    dateFin: "",
    presence: null,
    nombreInfluenceur: "",
    descriptionOffre: "",
    hashtags: "",
    compteTagger: "",
    ClientId: oneCampagneData.ClientId,
  });

  useEffect(() => {
    getOneCampagne(params.id, dispatch);
    getAllClient(dispatch);
  }, []);

  useEffect(() => {
    setCampagneInputValue({ ...oneCampagneData });
    //*fetch interet data
    oneCampagneData?.Interets?.forEach((ele) => {
      const op = {
        name: ele.interetNom,
        id: ele.id,
      };
      setInteretMult((options) => [...options, op]);
    });
  }, [oneCampagneData.id]);

  const fetchDataInteret = useCallback(() => {
    getAllInteret(dispatch);
    allInteretData.forEach((ele) => {
      const op = {
        name: ele.interetNom,
        id: ele.id,
      };
      setOptionsInteret((options) => [...options, op]);
    });
  }, [allInteretData[0]?.id]);

  useEffect(() => {
    fetchDataInteret();
  }, [fetchDataInteret]);

  const handleChange = (e) => {
    e.preventDefault();
    setCampagneInputValue({
      ...campagneInputValue,
      [e.target.name]: e.target.value,
    });
  };

  //------------------------------Submit --------------------------------

  const handleEdit = async (event) => {
    event.preventDefault();
    updateCampagne(params.id, campagneInputValue, interetMult, dispatch);
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
                  Campagne Update
                 
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => handleEdit(e)}>
                  <div className="mb-3">
                    <input
                      required
                      name="id"
                      type="text"
                      disabled={true}
                      defaultValue={oneCampagneData.id}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="titre">Titre: </label>
                    <input
                      required
                      name="titre"
                      id="titre"
                      type="text"
                      className="form-control"
                      defaultValue={oneCampagneData.titre}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="ClientId">Client ID: </label>
                    <select name="presence" className="form-control">
                      {allClientData.map((ele) => {
                        return (
                          <option value={ele.id} key={ele.id}>
                            {ele.id}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="dateDebut">Date Debut: </label>
                    <input
                      required
                      name="dateDebut"
                      id="dateDebut"
                      type="date"
                      className="form-control"
                      value={dateformat(
                        campagneInputValue.dateDebut,
                        "yyyy-mm-dd"
                      )}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="dateFin">Date Fin: </label>
                    <input
                      required
                      name="dateFin"
                      id="dateFin"
                      type="date"
                      className="form-control"
                      value={dateformat(
                        campagneInputValue.dateFin,
                        "yyyy-mm-dd"
                      )}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="nombreInfluenceur">
                      Nombre Influenceur:{" "}
                    </label>
                    <input
                      required
                      name="nombreInfluenceur"
                      id="nombreInfluenceur"
                      type="number"
                      className="form-control"
                      defaultValue={oneCampagneData.nombreInfluenceur}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                 
                <div className="mb-3">
                <label htmlFor="nomDirecteur" className="label-required">presence: </label>
                <select
                  required
                  name="presence"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option className="text-muted">Selection option</option>
                  {   oneCampagneData.presence == true ? (
                    <>
                    <option selected={true} value={true}>
                      oui
                    </option>
                    <option value={false}>non</option>
                    </>
                    
                  ) : (
                    <>
                    <>
                    <option value={true}>
                      oui
                    </option>
                    <option 
                    selected={true}
                    value={false}>
                    non</option>
                    </>
                    </>
                  )}
                </select>
              </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="descriptionOffre">
                      Description Offre:{" "}
                    </label>
                    <textarea
                      required
                      name="descriptionOffre"
                      id="descriptionOffre"
                      type="text"
                      className="form-control"
                      defaultValue={oneCampagneData.descriptionOffre}
                      onChange={(e) => handleChange(e)}
                    >
                    
                    </textarea>
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="hashtags">Hashtages: </label>
                    <input
                      required
                      name="hashtags"
                      id="hashtags"
                      type="text"
                      className="form-control"
                      placeholder="#hashtage #hashtage ..."
                      defaultValue={oneCampagneData.hashtags}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="compteTagger">Compte Tagger: </label>
                    <input
                      required
                      name="compteTagger"
                      id="compteTagger"
                      type="text"
                      className="form-control"
                      placeholder="@compte @compte ..."
                      defaultValue={oneCampagneData.compteTagger}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-required" htmlFor="dateDebut">Centre d'intéret: </label>
                    <Multiselect
                      required
                      displayValue="name"
                      //values={interetMult}
                      onSelect={(selectedList, removedItem) => {
                        setInteretMult(selectedList);  
                      }}
                      onRemove={(selectedList, removedItem) => {
                        setInteretMult(selectedList);
                      }}
                      selectedValues={interetMult}
                      options={optionsInteret}
                    />
                  </div>

                  <div className="mb-3">
                    <button 
                    type="submit" 
                    className="bleu-btn"
                    style={{fontSize:"14px",padding:"8px"}}
                    >
                      Update Campagne
                    </button>
                  </div>

                  <div className="mb-3">
                        <p className="text-danger">{error}</p>
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

export default EditCampagne;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneClient,
  updateClient,
} from "../../../redux/actions/client.actions";
import marocVille from "../../../assets/data/marocAddress/ville.json";
import marocQuartier from "../../../assets/data/marocAddress/quartier.json";
import {
  getOneInfluenceurUserId,
  updateInfluenceur,
} from "../../../redux/actions/influenceur.actions";
import { getAllLangue } from "../../../redux/actions/langue.actions";
import { getAllInteret } from "../../../redux/actions/interet.actions";

import dateformat from "dateformat";
import Select from "react-select";
import { getAllNiveauEtude } from "../../../redux/actions/niveauEtude.actions";

//!-----------------------------------------------
function EditForm({ id }) {
  const dispatch = useDispatch();

  const { oneInfluenceurData } = useSelector((state) => state.influenceur);
  const { langueData } = useSelector((state) => state.langue);
  const { allInteretData } = useSelector((state) => state.interet);

  const [optionsLangue, setOptionsLangue] = useState([
    {
      label: "veuillez entre langue",
      value: 0,
    },
  ]);
  const [optionsInteret, setOptionsInteret] = useState([
    {
      label: "veuillez entre Interet",
      value: 0,
    },
  ]);

  const [inputValue, setInputValue] = useState({
    id: "",
    nom: "",
    prenom: "",
    genre: "",
    dateNaissance: "",
    facebookUsernameCompte: "",
    youtubeUsernameCompte: "",
    pays: "",
    ville: "",
    quartier: "",
    situationFamiliale: "",
    nombreEnfant: "",
    niveauEtude: "",
    profession: "",
  });

  const { allNiveauEtudeData}=useSelector(state=>state.niveauEtude)
  const [langueMulti, setLangueMulti] = useState([]);
  const [interetMulti, setInteretMulti] = useState([]);

  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
  }, [id]);

  useEffect(()=>{
    getAllNiveauEtude(dispatch);
   },[])

  const fetchDataLangue = useCallback(() => {
    getAllLangue(dispatch);
    langueData.forEach((ele) => {
      const op = {
        label: ele.langueNom,
        value: ele.id,
      };
      setOptionsLangue((options) => [...options, op]);
    });
  }, [langueData[0]?.id]);

  useEffect(() => {
    fetchDataLangue();
  }, [fetchDataLangue]);
  //!----------------------------------

  //!------------------------------------------
  useEffect(() => {
    setInputValue({
      id: oneInfluenceurData?.id,
      nom: oneInfluenceurData?.nom,
      prenom: oneInfluenceurData?.prenom,
      genre: oneInfluenceurData?.genre,
      dateNaissance: oneInfluenceurData?.dateNaissance,
      facebookUsernameCompte: oneInfluenceurData?.facebookUsernameCompte,
      youtubeUsernameCompte: oneInfluenceurData?.youtubeUsernameCompte,
      pays: oneInfluenceurData?.pays,
      ville: oneInfluenceurData?.ville,
      quartier: oneInfluenceurData?.quartier,
      situationFamiliale: oneInfluenceurData?.situationFamiliale,
      nombreEnfant: oneInfluenceurData?.nombreEnfant,
      niveauEtude: oneInfluenceurData?.niveauEtude,
      profession: oneInfluenceurData?.profession,
    });
  }, [oneInfluenceurData?.id]);

  const fetchDataInteret = useCallback(() => {
    getAllInteret(dispatch);
    allInteretData.forEach((ele) => {
      const op = {
        label: ele.interetNom,
        value: ele.id,
      };
      setOptionsInteret((options) => [...options, op]);
    });
  }, [allInteretData[0]?.id]);

  useEffect(() => {
    fetchDataInteret();
  }, [fetchDataInteret]);

  //*=================================================
  const handleChange = (e) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleChangeLangue = (e) => {
    setLangueMulti(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleChangeInteret = (e) => {
    setInteretMulti(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //!-----------------------------------------
  const handleEdit = (event) => {
    event.preventDefault();
    updateInfluenceur(
      oneInfluenceurData?.id,
      inputValue,
      langueMulti,
      interetMulti,
      dispatch
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4>Edit Compte</h4>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleEdit(e)}>
              <div className="mb-3">
                <label className="label-required" htmlFor="nom">nom: </label>
                <input
                  name="nom"
                  id="nom"
                  type="text"
                  className="form-control"
                  defaultValue={oneInfluenceurData?.nom}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <label className="label-required" htmlFor="prenom">prenom: </label>
                <input
                  name="prenom"
                  id="prenom"
                  type="text"
                  className="form-control"
                  defaultValue={oneInfluenceurData?.prenom}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <label className="label-required" htmlFor="profession">profession: </label>
                <input
                  name="profession"
                  id="profession"
                  type="text"
                  className="form-control"
                  defaultValue={oneInfluenceurData?.profession}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <label className="label-required mb-2">pays: </label>
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
                    if (ele == oneInfluenceurData.ville) {
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
                <label className="mb-2 label-required" >quartier: </label>
                <select
                  name="quartier"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option hidden={true} className="text-muted">
                    Selection votre quartier
                  </option>
                  {marocQuartier[inputValue?.ville]?.map((ele, index) => {
                    if (ele == oneInfluenceurData.quartier) {
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
                <label htmlFor="nomDirecteur" className="label-required">genre: </label>
                <select
                  name="quartier"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option className="text-muted">Selection votre genre</option>
                  {oneInfluenceurData?.genre === "homme" ? (
                    <option selected={true} value="homme">
                      homme
                    </option>
                  ) : (
                    <option value="femme">femme</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="label-required" htmlFor="dateNaissance">date naissance: </label>
                <input
                  name="dateNaissance"
                  id="dateNaissance"
                  type="date"
                  className="form-control"
                  value={dateformat(inputValue.dateNaissance, "yyyy-mm-dd")}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <label className="label-required" htmlFor="situationFamiliale">
                  situation familiale:{" "}
                </label>
                <select
                  name="situationFamiliale"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option className="text-muted">Selection votre genre</option>
                  <option
                    selected={
                      oneInfluenceurData.situationFamiliale === "célébataire"
                        ? true
                        : false
                    }
                    value="célébataire"
                  >
                    célébataire
                  </option>

                  <option
                    selected={
                      oneInfluenceurData.situationFamiliale === "marié"
                        ? true
                        : false
                    }
                    value="marié"
                  >
                    marié
                  </option>
                  <option
                    selected={
                      oneInfluenceurData.situationFamiliale === "divorcé"
                        ? true
                        : false
                    }
                    value="divorcé"
                  >
                    divorcé
                  </option>
                  <option
                    selected={
                      oneInfluenceurData.situationFamiliale === "veuf"
                        ? true
                        : false
                    }
                    value="veuf"
                  >
                    veuf
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label className="label-required" htmlFor="nombreEnfant">nombre enfant: </label>
                <input
                  name="nombreEnfant"
                  id="nombreEnfant"
                  type="number"
                  className="form-control"
                  defaultValue={oneInfluenceurData?.nombreEnfant}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="niveauEtude">
                  Niveau des études
                </label>
                <select
                 required
                 name="NiveauEtudeId"
                 className="form-control"
                 onChange={(e) => handleChange(e)}
                >
                 <option value="" className="text-muted">
                    Selection niveau etude
                  </option>
                  {
                  
                   allNiveauEtudeData?.map((ele)=>{
         
                    return <option 
                    key={ele.id} 
                    value={ele.id}
                    selected={
                      ele.niveauEtudeNom=== oneInfluenceurData?.NiveauEtude.niveauEtudeNom
                        ? true
                        : false
                    }
                    >
                    {ele.niveauEtudeNom}</option>
                   })
                  }
                </select>
              </div>

             

              <div className="mb-3">
                <label className="form-label label-required" htmlFor="langue">
                  Langue
                </label>
                <Select
                  required={true}
                  isMulti
                  options={optionsLangue}
                  id="langue"
                  name="langue"
                  onChange={handleChangeLangue}
                ></Select> 
              </div>

              <div className="mb-3">
                <label className="form-label label-required" htmlFor="interet">
                  Centre Interet
                </label>
                <Select
                  required={true}
                  isMulti
                  options={optionsInteret}
                  id="interet"
                  name="interet"
                  onChange={handleChangeInteret}
                ></Select>
              </div>

              <div className="mb-3">
                <label htmlFor="email " className="label-required">youtube username: </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="form-control"
                  defaultValue={oneInfluenceurData.youtubeUsernameCompte}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="label-required">facebook username: </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="form-control"
                  defaultValue={oneInfluenceurData.facebookUsernameCompte}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Update Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;

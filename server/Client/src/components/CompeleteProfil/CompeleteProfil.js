import React, { useCallback, useContext, useEffect, useState } from "react";
import marocVille from "../../assets/data/marocAddress/ville.json";
import marocQuartier from "../../assets/data/marocAddress/quartier.json";
import { getAllLangue } from "../../redux/actions/langue.actions";
import { getAllInteret } from "../../redux/actions/interet.actions";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { compeleteProfil } from "../../redux/actions/register.actions";
import { UidContext } from "../../contexts/AppContext";
import NavbarRegister from "../NavBar/NavbarRegister";
import PageDejaConnect from "../PageNotFound/PageDejaConnect";
import { getAllNiveauEtude } from "../../redux/actions/niveauEtude.actions";

function CompeleteProfil() {
  const id = useContext(UidContext);

  const [values, setValues] = useState({
    pays: "",
    ville: "",
    quartier: "",
    situationFamiliale: "",
    nombreEnfant: "",
    NiveauEtudeId:0,
    profession: "",
    langue: [],
    interet: [],
  });

  const [checkedCondition,setCheckedCondition]=useState(false);
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

  const location = useLocation();
  const Querys = new URLSearchParams(location.search);
  const queryIds = Querys.get("id");
  const dispatch = useDispatch();
  const { langueData } = useSelector((state) => state.langue);
  const { allInteretData } = useSelector((state) => state.interet);
  const { allNiveauEtudeData}=useSelector(state=>state.niveauEtude)
  //*-------------------------------------------------

  useEffect(()=>{
   getAllNiveauEtude(dispatch);
  },[])

  //*--------------------------------------------

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

  //*---------------------------

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

  //*------------------------------------------------
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeLangue = (e) => {
    const langue = Array.isArray(e) ? e.map((x) => x.value) : [];
    setValues({ ...values, langue: langue });
  };

  const handleChangeInteret = (e) => {
    const interet = Array.isArray(e) ? e.map((x) => x.value) : [];
    setValues({ ...values, interet: interet });
  };
 //*------------------------------------------------------
 const handleDisable=(e)=>{
  e.preventDefault();
}

 const handleAccepterCondition=(e)=>{
  if(e.target.checked){
     setCheckedCondition(true);
  }else{
    setCheckedCondition(false)
  }
 }

//*---------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ( 
      values.situationFamiliale === "célébataire" &&
      values.nombreEnfant != 0
    ) {
      toast.error("erreur célébataire a 0 enfants ");
    } else { 
      console.log(values);
     compeleteProfil(queryIds, values, dispatch);
      
    }
  };


  //?------------------------------------------------------

  return (
    <>
      <ToastContainer autoClose={3000} />
      <NavbarRegister />
      {id ? (
        <>
          <PageDejaConnect />
        </>
      ) : (
        <>
          <div
            className="container w-50 shadow-lg p-3 mb-5 bg-white rounded "
            style={{ marginTop: "30px" }}
          >
            <div className="text-center p-3">Complete Profil</div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="pays">
                  Pays
                </label>
                <select
                  required
                  name="pays"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value=""  className="text-muted">
                    Selection votre Pays
                  </option>
                  <option value="Maroc">Maroc</option>
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="ville">
                  Ville
                </label>
                <select
                  required
                  name="ville"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option  value="" className="text-muted">
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

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="quartier">
                  Quartier
                </label>
                <select
                  required
                  name="quartier"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" className="text-muted">
                    Selection votre quartier
                  </option>
                  {marocQuartier[values?.ville]?.map((ele, index) => {
                    return (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="situationFamiliale">
                  Situation Familiale
                </label>
                <select
                  required
                  name="situationFamiliale"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" className="text-muted">
                    Selection votre Situation Familiale
                  </option>
                  <option value="célébataire">célébataire</option>
                  <option value="marié">marié</option>
                  <option value="divorcé">divorcé</option>
                  <option value="veuf">veuf</option>
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="ville">
                  Nombre des Enfants
                </label>
                <input
                  required
                  name="nombreEnfant"
                  id="nombreEnfant"
                  type="number"
                  min={0}
                  className="form-control"
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
                    return <option key={ele.id} value={ele.id}>{ele.niveauEtudeNom}</option>
                   })
                  }
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label label-required" htmlFor="profession">
                  Profession
                </label>
                <input
                  required
                  name="profession"
                  id="profession"
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-outline mb-4">
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

              <div className="form-outline mb-4">
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

              <div className="form-outline mb-4">
                
                <input 
                  type="checkbox"
                  style={{marginRight:"6px"}}
                  onClick={(e)=>handleAccepterCondition(e)}
                />
                <label className="form-label" htmlFor="interet">
                  Accepter les  
                </label>
                <a 
                className="label-required" 
                target="_blank"
                href={`${process.env.REACT_APP_URL_SERVER}/api/v1/conditionGenrale/pdf/SISSY-PH05222090812040.pdf`}> conditions generale</a>
              </div>

             {
              checkedCondition ?
              <>
              <button  type="submit" className="btn bleu-btn w-100">
                Submit
              </button>
              </>
              :
              <>
                <a className="btn bleu-btn w-100" style={{opacity:"0.5"}}>Submit</a>
              </>
             }
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default CompeleteProfil;

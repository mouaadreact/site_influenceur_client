import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInteret } from "../../../../redux/actions/interet.actions";
import { getAllLangue } from "../../../../redux/actions/langue.actions";
import { filterInfluenceur } from "../../../../redux/actions/influenceur.actions";
import marocVille from "../../../../assets/data/marocAddress/ville.json";
import marocQuartier from "../../../../assets/data/marocAddress/quartier.json";
import { getAllNiveauEtude } from "../../../../redux/actions/niveauEtude.actions";

function FilterSidebar() {
  const dispatch = useDispatch();

  const { allInteretData } = useSelector((state) => state.interet);
  const { langueData } = useSelector((state) => state.langue);
  const { allNiveauEtudeData } = useSelector((state) => state.niveauEtude);
  //* data enregister dans change function
  const [centreInteretFilter, setCentreInteretFilter] = useState([]);
  const [langueFilter, setLangueFilter] = useState([]);
  const [filterData, setFilterData] = useState({
    ville: "",
    statusEtatActiver: "",
    quartier: "",
    genre: "",
    ageMin: "",
    ageMax: "",
    pays: "",
    situationFamiliale: "",
    NiveauEtudeId: "",
  });

  useEffect(() => {
    getAllInteret(dispatch);
    getAllLangue(dispatch);
    getAllNiveauEtude(dispatch);
  }, []);

  const [checkedState, setCheckedState] = useState([]);

  //*******************************************************
  const handleChangeInteret = (e) => {
    const { value, checked } = e.target;
    //add
    if (checked) {
      setCentreInteretFilter([...centreInteretFilter, value]);
    }

    // remove
    else {
      setCentreInteretFilter(centreInteretFilter.filter((e) => e !== value));
    }
  };

  //**********************************************************
  const handleChangeLangue = (e) => {
    const { value, checked } = e.target;
    //add
    if (checked) {
      setLangueFilter([...langueFilter, value]);
    }

    // remove
    else {
      setLangueFilter(langueFilter.filter((e) => e !== value));
    }
  };

  //?---------------------------------------

  //******************************************************

  const handleChangeFilter = (e) => {
    setFilterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //?---------------------------------------------

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    filterInfluenceur(filterData, langueFilter, centreInteretFilter, dispatch);
  };

  return (
    <div 
    className="bg-white" 
    id="sidebar-wrapper"
    style={{boxShadow:"rgb(0, 0, 0) 0.3px 0px 10px",zIndex:"1"}}>
      <div className="sidebar-heading primary-bg text-center py-3 text-white fs-4 fw-bold text-uppercase border-bottom">
        <i className="fas fa-user-secret me-2"></i>Filter
      </div>
      <div className="list-group list-group-flush my-3">
        <div style={{ marginLeft: "10px" }}>
          <form onSubmit={(e) => handleSubmitFilter(e)}>
            <table>
              <thead>
                <tr>
                  <th>Centre Interet</th>
                </tr>
              </thead>
              <tbody>
                {allInteretData?.map((ele, index) => (
                  <tr key={index + 1}>
                    <td>
                      <input
                        type="checkbox"
                        id="scales"
                        name="scales"
                        value={ele.id}
                        onChange={(e) => handleChangeInteret(e)}
                      />
                      <label style={{ marginLeft: "10px" }} htmlFor="scales">
                        {ele.interetNom}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Langue</th>
                </tr>
              </thead>
              <tbody>
                {langueData?.map((ele, index) => (
                  <tr key={index + 1}>
                    <td>
                      <input
                        type="checkbox"
                        id="langue"
                        name="langue"
                        value={ele.id}
                        onChange={(e) => handleChangeLangue(e)}
                      />
                      <label style={{ marginLeft: "10px" }} htmlFor="langue">
                        {ele.langueNom}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Status Active/Descative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status1"
                      name="statusEtatActiver"
                      value={true}
                      onChange={(e) => handleChangeFilter(e)}
                    />
                    <label style={{ marginLeft: "10px" }} htmlFor="status1">
                      Active
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status2"
                      name="statusEtatActiver"
                      value={false}
                      onChange={(e) => handleChangeFilter(e)}
                    />
                    <label style={{ marginLeft: "10px" }} htmlFor="status2">
                      Desactive
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status3"
                      name="statusEtatActiver"
                      value=""
                      onChange={(e) => handleChangeFilter(e)}
                    />
                    <label style={{ marginLeft: "10px" }} htmlFor="status3">
                      All
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Filtrage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="ville">ville :</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                      name="ville"
                      className="form-control w-75"
                      onChange={(e) => handleChangeFilter(e)}
                    >
                      <option className="text-muted" value="">
                        Selection ville
                      </option>
                      {marocVille["ville"].map((ele, index) => {
                        return (
                          <option key={index} value={ele}>
                            {ele}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="quartier">quartier :</label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select
                      name="quartier"
                      className="form-control w-75"
                      onChange={(e) => handleChangeFilter(e)}
                    >
                      <option className="text-muted" value="">
                        Selection quartier
                      </option>
                      {marocQuartier[filterData?.ville]?.map((ele, index) => {
                        return (
                          <option key={index} value={ele}>
                            {ele}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Genre :</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      onChange={(e) => handleChangeFilter(e)}
                      type="radio"
                      id="genre1"
                      name="genre"
                      value="homme"
                    />
                    <label htmlFor="genre1">homme</label>

                    <input
                      onChange={(e) => handleChangeFilter(e)}
                      type="radio"
                      id="genre2"
                      name="genre"
                      value="femmme"
                      style={{ marginLeft: "10px" }}
                    />
                    <label htmlFor="genre2">femme</label>

                    <input
                      onChange={(e) => handleChangeFilter(e)}
                      type="radio"
                      id="genre3"
                      name="genre"
                      value=""
                      style={{ marginLeft: "10px" }}
                    />
                    <label htmlFor="genre3">All</label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="age" style={{ fontWeight: "bold" }}>
                      Age :
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    Min:
                    <input
                      onChange={(e) => handleChangeFilter(e)}
                      type="number"
                      id="ageMin"
                      name="ageMin"
                      className="form-control w-75"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Max:
                    <input
                      onChange={(e) => handleChangeFilter(e)}
                      type="number"
                      id="ageMax"
                      name="ageMax"
                      className="form-control w-75"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor=" situationFamiliale">
                      situation familiale :{" "}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                      onChange={(e) => handleChangeFilter(e)}
                      
                      name="situationFamiliale"
                      className="form-control w-75"
                    >
                      <option value="" className="text-muted">
                        Veuillez selection
                      </option>
                      <option value="célébataire">célébataire</option>
                      <option value="marié">marié</option>
                      <option value="célébataire">célébataire</option>
                      <option value="divorcé">divorcé</option>
                      <option value="veuf">veuf</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="niveauEtude">niveau etude :</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                     
                      id="niveauEtude"
                      name="NiveauEtudeId"
                      className="form-control w-75"
                      onChange={(e) =>  handleChangeFilter(e)}
                    >
                      <option value="" className="text-muted">
                      Veuillez selection
                      </option>
                      {allNiveauEtudeData?.map((ele) => {
                        return (
                          <option key={ele.id} value={ele.id}>
                            {ele.niveauEtudeNom}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <td>
                    <button type="submit" className="btn bleu-btn mt-3">
                      Filter Influenceur
                    </button>
                  </td>
                </tr>
              </thead>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;

import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInteret } from "../../../../redux/actions/interet.actions";
import {
  filterCentreInteret,
  filterStatusCampagne,
} from "../../../../redux/actions/filter.actions";
import { getAllClient } from "../../../../redux/actions/client.actions";
import { filterCampagne } from "../../../../redux/actions/campagne.actions";

function FilterSidebar() {
  const dispatch = useDispatch();
  const { allInteretData } = useSelector((state) => state.interet);
  const { allClientData } = useSelector((state) => state.client);

  const [optionsInteret, setOptionsInteret] = useState([]);

  //* useState of data filter
  const [centreInteretFilter, setCentreInteretFilter] = useState([]);
  const [filterData, setFilterData] = useState({
    presence: "",
    dateDebutMin: "",
    dateDebutMax: "",
    dateFinMin: "",
    dateFinMax: "",
    nombreInfluenceur: "",
    ClientId: "",
  });

  //* fetch all interet data

  useEffect(() => {
    getAllInteret(dispatch);
    getAllClient(dispatch);
  }, []);

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

  //!---------------------------------------------------------

  const handleChangeFilter = (e) => {
    setFilterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(allClientData);

  //*filterCampagne

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    filterCampagne(filterData, centreInteretFilter, dispatch);
  };

  //!-----------------------------------------------------------
  return (
    <div className="bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading primary-bg text-center py-3 text-white fs-4 fw-bold text-uppercase border-bottom">
        <i className="fas fa-user-secret me-2"></i>Filter
      </div>
      <div className="list-group list-group-flush my-3">
        <div style={{ marginLeft: "10px" }}>
          <form onSubmit={(e) => handleSubmitFilter(e)}>
            <table>
              <thead>
                <tr>
                  <th>List Client</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {
                      <>
                        <select
                          name="ClientId"
                          className="form-control"
                          onChange={(e) => handleChangeFilter(e)}
                        >
                          <option className="text-muted" value="">
                            Client List
                          </option>
                          {allClientData?.map((ele) => {
                            return (
                              <option key={ele.id} value={ele.id}>
                                {ele.raisonSociale}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    }
                  </td>
                </tr>
              </tbody>
            </table>

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
                  <th>Status Campagne</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status1"
                      name="presence"
                      value={true}
                      onChange={(e) => handleChangeFilter(e)}
                    />
                    <label style={{ marginLeft: "10px" }} htmlFor="status1">
                      Presence
                    </label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status2"
                      name="presence"
                      value={false}
                      onChange={(e) => handleChangeFilter(e)}
                    />
                    <label style={{ marginLeft: "10px" }} htmlFor="status2">
                      Online
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="status3"
                      name="presence"
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
                  <th>Date Debut :</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label
                      style={{ marginRight: "10px" }}
                      htmlFor="dateDebutMin"
                    >
                      Min :
                    </label>
                    <input
                      type="date"
                      id="dateDebutMin"
                      name="dateDebutMin"
                      onChange={(e) => handleChangeFilter(e)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label
                      style={{ marginRight: "10px" }}
                      htmlFor="dateDebutMax"
                    >
                      Max :
                    </label>
                    <input
                      type="date"
                      id="dateDebutMax"
                      name="dateDebutMax"
                      onChange={(e) => handleChangeFilter(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Date Fin :</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label style={{ marginRight: "10px" }} htmlFor="dateFinMin">
                      Min :
                    </label>
                    <input
                      type="date"
                      id="dateFinMin"
                      name="dateFinMin"
                      onChange={(e) => handleChangeFilter(e)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label style={{ marginRight: "10px" }} htmlFor="dateFinMax">
                      Max :
                    </label>
                    <input
                      type="date"
                      id="dateFinMax"
                      name="dateFinMax"
                      onChange={(e) => handleChangeFilter(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Nombre Influenceur:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      id="nombreInfluenceur"
                      name="nombreInfluenceur"
                      className="form-control"
                      onChange={(e) => handleChangeFilter(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <td>
                    <button type="submit" className="btn btn-primary mt-3">
                      Filter Campagne
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

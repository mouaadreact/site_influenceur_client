import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampagne } from "../../../../redux/actions/campagne.actions";
import AddGalerieCampagne from "./AddGalerieCampagne";
import PreviewGalerieCampagne from "./PreviewGalerieCampagne";

function ViewGalerieCampagne() {
  const dispatch = useDispatch();
  const { allCampagneData } = useSelector((state) => state.campagne);
  const [optionsClient, setOptionsClient] = useState([]);
  const [add, setAdd] = useState(false);

  const [idCampagne, setIdCampagne] = useState("");

  const fetchDataCampagne = useCallback(() => {
    getAllCampagne(dispatch);
    allCampagneData.forEach((ele) => {
      setOptionsClient((options) => [...options, ele.id]);
    });
  }, [allCampagneData[0]?.id]);

  useEffect(() => {
    fetchDataCampagne();
  }, [fetchDataCampagne]);

  const handleChangeButton = (event) => {
    event.preventDefault();
    setAdd(!add);
  };

  const handleChange = async (e) => {
    setIdCampagne(e.target.value);
  };

  return (
    <div className="container-fluid px-4">
      <div className="container mt-5 w-100 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {add == false ? (
                <>
                  <div className="card-header">
                    <a
                      onClick={(e) => handleChangeButton(e)}
                      className="btn btn-primary float-end"
                    >
                      + add Galerie
                    </a>
                    <h4>Galerie Campagne</h4>

                    <form>
                      <div className="mb-3">
                        <label style={{ marginRight: "10px" }}>
                          Campagne ID
                        </label>
                        <select
                          name="CampagneId"
                          className="w-25"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Veuillez select Campagne ID</option>
                          {allCampagneData.map((ele) => {
                            return (
                              <option value={ele.id} key={ele.id}>
                                {ele.id}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </form>
                  </div>

                  <div className="card-body">
                    <PreviewGalerieCampagne idCampagne={idCampagne} />
                  </div>
                </>
              ) : (
                <AddGalerieCampagne
                  handleChangeButton={handleChangeButton}
                  CampagneData={allCampagneData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGalerieCampagne;

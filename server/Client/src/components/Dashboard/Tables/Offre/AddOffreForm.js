import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getAllCampagne, getOneCampagne } from "../../../../redux/actions/campagne.actions";
import { getAllInfluenceur } from "../../../../redux/actions/influenceur.actions";
import { addOffre } from "../../../../redux/actions/offre.actions";

function AddOffreForm() {
  const dispatch = useDispatch();
  const [campagneId,setCampagneId]=useState("");
  const { allCampagneData } = useSelector((state) => state.campagne);
  const { allInfluenceurData } = useSelector((state) => state.influenceur);
  useEffect(() => {
    getAllCampagne(dispatch);
    //*listInfluenceur
    getAllInfluenceur(dispatch);
  }, []);

  //*---------------------------------

  const handleChange = (e) => {
    setCampagneId(e.target.value)
  };

  //*-------------------------------------
  const onSubmit = async (e) => {
   e.preventDefault()
       let listInfluenceur = [];
    allInfluenceurData.forEach((ele) => {
      let op = {
        id: ele.id,
        email: ele.User.email,
      };
      listInfluenceur.push(op);
    });

      addOffre(campagneId,listInfluenceur, dispatch);
    
  };

  //*---------------------------------------------
  return (
    <div className="container-fluid px-4">
    <ToastContainer autoClose={2000}/>
      <div className="container mt-5 w-100 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Offre
                  <a
                    href="/dashboard/offre"
                    className="btn btn-danger float-end"
                  >
                    BACK
                  </a>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={(e)=>onSubmit(e)}>
                  <div className="mb-3">
                  <label className="label-required mb-2">Campagne:</label>
                    <select
                      onChange={(e) => handleChange(e)}
                      className="form-control w-50"
                      name="CampagneId"
                    >
                      <option value="">Select Campagne</option>
                      {allCampagneData?.map((row) => {
                        return (
                          <option key={row.id} value={row.id}>
                            {row.titre}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Add Offre
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOffreForm;

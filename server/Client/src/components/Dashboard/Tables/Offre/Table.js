import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampagne } from "../../../../redux/actions/campagne.actions";
import { getAllOffre } from "../../../../redux/actions/offre.actions";
import Loading from "../../../Loading/Loading";

function Table({ name, fieldsTable }) { 

  const [CampagneId,setCampagneId]=useState("");
  const dispatch = useDispatch();
  const {loading,allOffreData } = useSelector((state) => state.offre);
  const { allCampagneData } = useSelector((state) => state.campagne);

  //!----------------------------------
  useEffect(() => {
    getAllOffre(CampagneId,dispatch);
    getAllCampagne(dispatch);
  }, [CampagneId]);


  const handleChangeCampagneId=(e)=>{
      setCampagneId(e.target.value);
  }

  //?---------------------------------------
  return (
   
    
       <div className="container-fluid px-4">
      <div className="row my-5">
        <div className="card-hearder mb-3">
          <h4>
            {name} Table
            
          </h4>
        </div>

        <div className="card-header ml-3" style={{marginLeft:"10px"}}> 
            <div className="mb-3">
              <label style={{ marginRight: "10px" }}>Campagne ID</label>
              <select
                name="CampagneId"
                className="w-25"
               onChange={(e) => handleChangeCampagneId(e)}
              >
                <option value="">
                  Veuillez select Campagne ID
                </option>
                {allCampagneData?.map((ele) => {
                  return (
                    <option value={ele.id} key={ele.id}>
                      {ele.id}
                    </option>
                  );
                })}
              </select>
            </div> 
        </div>

        <div className="col">
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col" className="text-warning" width="50">
                  ID
                </th>
                {fieldsTable.map((ele, index) => {
                  return (
                    <th key={index} scope="col">
                      {ele}
                    </th>
                  );
                })}
               
              </tr>
            </thead>
            <tbody>
              {allOffreData?.map((ele, index) => {
                return (
                  <tr key={index + 1} className="text-center">
                    <td key={index + 1} className="text-warning">
                      {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                    </td>
                    <td>{ele.CampagneId}</td>
                    <td>{ele.InfluenceurId}</td>
                    <td>{   
                       ele.status==="En cours traitement" && <div className="btn btn-warning">{ele.status}</div>                      
                      }
                      {
                        ele.status==="Accepter" && <div className="btn btn-success">{ele.status}</div> 
                      }
                      {
                        ele.status==="Refuser" && <div className="btn btn-danger">{ele.status}</div> 
                      }
                      

                      </td> 
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       </div>
    
    </div>
    
  );
}

export default Table;

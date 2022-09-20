import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampagne } from "../../../../redux/actions/campagne.actions";
import dateformat from "dateformat";
import {
  deleteEtatPaiment,
  getAllEtatPaiment,
} from "../../../../redux/actions/etatPaiment.actions";
import Loading from "../../../Loading/Loading";
import Pagenation from "../../../Pagination/Pagination";

function Table({ name, fieldsTable }) {
  const [CampagneId, setCampagneId] = useState("");
  const dispatch = useDispatch();
  const { loading, allEtatPaiment } = useSelector((state) => state.etatPaiment);
  const { allCampagneData } = useSelector((state) => state.campagne);

  //*pagination elements
  var [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = allEtatPaiment.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //!----------------------------------
  //*fetch data
  useEffect(() => {
    getAllEtatPaiment(CampagneId, dispatch);
    getAllCampagne(dispatch);
  }, [CampagneId]);

  const handleDelete = (idCampagne, idInfluencuer) => {
    deleteEtatPaiment(idCampagne, idInfluencuer, dispatch);
  };

  const handleChangeCampagneId = (e) => {
    setCampagneId(e.target.value);
  };

  // console.log()
  //?---------------------------------------
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div 
          className="container-fluid px-4"
          style={{backgroundColor:"#EB6E35"}} >
            <div
              className="row my-5"
              style={{
                background: "#DDD",
                padding: "13px",
                borderRadius: "10px",
              }}
            >
              <div className="card-hearder mb-3">
                <h4>
                  {name} Table
                  <a
                    href={`/dashboard/etatPaiment/add`}
                    className="btn bleu-btn"
                    style={{float:"right"}}
                  >
                    + add EtatPaiment
                  </a>
                </h4>
              </div>

              <div className="card-header ml-3" style={{ marginLeft: "10px" }}>
                <div className="mb-3">
                  <label style={{ marginRight: "10px" }}>Campagne ID</label>
                  <select
                    name="CampagneId"
                    className="w-25"
                    onChange={(e) => handleChangeCampagneId(e)}
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
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((ele, index) => {
                      return (
                        <tr key={index + 1} className="text-center">
                          <td key={index + 1} className="text-warning">
                            {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                          </td>
                          <td>{ele.titre}</td>
                          <td>{ele.instagramUsernameCompte}</td>
                          <td>{dateformat(ele.dateReglement, "dd/mm/yyyy")}</td>
                          <td>{ele.tarif}</td>
                          <td>{ele.currency}</td>
                          <td scope="col" width="150">
                            <a
                              href={`/dashboard/etatPaiment/edit/${ele.CampagneId}/${ele.InfluenceurId}`}
                              className="warning-text"
                              style={{ fontSize: "18px", marginRight: "10px" }}
                            >
                              <AiFillEdit />
                            </a>
                            <a
                              className="danger-text"
                              style={{ fontSize: "18px" }}
                              onClick={() =>
                                handleDelete(ele.CampagneId, ele.InfluenceurId)
                              }
                            >
                              <AiFillDelete />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-2" style={{ float: "right" }}>
                  <Pagenation
                    postsPerPage={postsPerPage}
                    totalPosts={allEtatPaiment.length}
                    paginate={paginate}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Table;

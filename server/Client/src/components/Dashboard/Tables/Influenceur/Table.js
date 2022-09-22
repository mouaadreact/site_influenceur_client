import React, { useEffect, useState } from "react";
import {AiFillEye } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import {
  changeEtatCompteInfluenceur,
  deleteInfluenceur,
  getAllInfluenceur,
  misAjourData,
} from "../../../../redux/actions/influenceur.actions";
import Loading from "../../../Loading/Loading";
import Pagenation from "../../../Pagination/Pagination";

function Table({ name, fieldsTable }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchField, setSearchField] = useState("id");
  const { allInfluenceurData, loading } = useSelector(
    (state) => state.influenceur
  );

  //*pagination elements
  var [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = allInfluenceurData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //*fetch all data
  useEffect(() => {
    getAllInfluenceur(dispatch);
    setData(allInfluenceurData);
  }, []);

  //!-----------------------------------------

  const handleChangeStatusActive = (e, id, status) => {
    e.preventDefault();
    changeEtatCompteInfluenceur(id, status, dispatch);
  };

  const handleMisAJour=(e)=>{
    e.preventDefault();
    misAjourData(dispatch)
  }

  //******************************************

  const search = (rows) => {
    return rows?.filter((row) => {
      if (q === "") {
        return row;
      } else {
        return (
          row[searchField]
            ?.toString()
            .toLowerCase()
            .indexOf(q?.toString().toLowerCase()) > -1
        );
      }
    });
  };


  return (
     <div
      className="container-fluid px-4"
      style={{ backgroundColor: "#EB6E35" }}
    >
      {
        loading 
        ?
        <>
          <Loading />
        </>
        :
        <>
      <div
        className="row my-5  p-4"
        style={{ backgroundColor: "#DDD", borderRadius: "10px" }}
      >
        <div className="card-hearder mb-3">
          <h4>
            {name} Table
            <a 
            onClick={(e)=>handleMisAJour(e)}
            className="bleu-btn float-end"
            >Mis à jour</a>
          </h4>
        </div>

        <div className="card-hearder mb-3">
          <input
            className="p-1 form-control w-25 mb-2"
            placeholder="search .."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label htmlFor="id" style={{ fontWeight: "bold" }}>
            Search :{" "}
          </label>
          <input
            id="id1"
            name="searchDField"
            type="radio"
            value="id"
            defaultChecked="checked"
            style={{ marginLeft: "10px" }}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <label htmlFor="id1">ID</label>

          <input
            id="id2"
            name="searchDField"
            type="radio"
            value="nom"
            style={{ marginLeft: "10px" }}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <label htmlFor="id2">Nom</label>

          <input
            id="id3"
            name="searchDField"
            type="radio"
            value="prenom"
            style={{ marginLeft: "10px" }}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <label htmlFor="id3">Prenom</label>

          <input
            id="id3"
            name="searchDField"
            type="radio"
            value="instagramUsernameCompte"
            style={{ marginLeft: "10px" }}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <label htmlFor="id3">Username Instagram</label>
        </div>

        <div className="table-responsive">
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col" width="50" className="text-warning">
                  ID
                </th>
                {fieldsTable &&
                  fieldsTable.map((ele, index) => {
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
              {search(currentData)?.map((ele, index) => {
                return (
                  <tr key={index + 1} className="text-center">
                    <td className="text-warning">
                      {ele.id < 10 ? "0" + ele.id : ele.id}
                    </td>
                    <td>{ele.nom}</td>
                    <td>{ele.prenom}</td>
                    <td>{ele.instagramUsernameCompte}</td>
                    <td>{ele.commentaire ? ele.commentaire : "-"}</td>
                    <td>
                      <div
                        onClick={(e) =>
                          handleChangeStatusActive(
                            e,
                            ele.id,
                            ele.statusEtatActiver
                          )
                        }
                        className={
                          (ele.statusEtatActiver == true ? "green" : "red") +
                          "-status"
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {ele.statusEtatActiver == true ? "Active" : "Desactive"}
                      </div>
                    </td>
                    <td scope="col" width="150">
                      <a
                        href={`/dashboard/influenceur/view/${ele.id}`}
                        className="success-text"
                        style={{ fontSize: "16px", marginRight: "10px" }}
                      >
                        <AiFillEye />
                      </a>
                      <a
                        href={`/dashboard/influenceur/edit/${ele.id}`}
                        className="warning-text"
                        style={{ fontSize: "18px", marginRight: "10px" }}
                      >
                        <BiCommentDetail />
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
              totalPosts={allInfluenceurData.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    
        </>
      }
    </div>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEtatCompteClient,
  deleteClient,
  getAllClient,
} from "../../../../redux/actions/client.actions";
import Pagenation from "../../../Pagination/Pagination";

function Table({ name, fieldsTable }) {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const { allClientData, loading } = useSelector((state) => state.client);

  //*pagnitaion elements
  var [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = allClientData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //* fetch data
  useEffect(() => {
    getAllClient(dispatch);
  }, []);

//*handle change Etat active:

const handleChangeStatusActive = (e, id, status) => {
  e.preventDefault();
  changeEtatCompteClient(id, status, dispatch);
};


//*search:
  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.id == parseInt(q) ||
        row.raisonSociale.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.nomDirecteur.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.telephone.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.email.toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  };

  return (
    <div className="container-fluid px-4">
      <div className="row my-5">
        <div className="card-hearder mb-3">
          <h4>
            {name} Table
            <a
              href={`/dashboard/client/add`}
              className="btn btn-primary float-end"
            >
              + add Client
            </a>
          </h4>
        </div>

        <div className="card-hearder mb-3">
          <input
            className="p-1 form-control w-25"
            placeholder="search .."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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
              {search(currentData)?.map((ele, index) => {
                return (
                  <tr key={index + 1} className="text-center">
                    <td key={index + 1} className="text-warning">
                      {ele.id < 10 ? "0" + ele.id : ele.id}
                    </td>
                    <td>{ele.raisonSociale}</td>
                    <td>{ele.nomDirecteur}</td>
                    <td>{ele.telephone}</td>
                    <td>{ele.email}</td>
                    <td>
                    <div
                        onClick={(e) =>
                          handleChangeStatusActive(
                            e,
                            ele.id,
                            ele.statusActive
                          )
                        }
                        className={
                          "btn btn-" +
                          (ele.statusActive == true ? "success" : "danger")
                        }
                      >
                        {ele.statusActive == true ? "Active" : "Desactive"}
                      </div>
                    </td>
                    <td scope="col" width="150">
                      <a
                        href={`/dashboard/client/view/${ele.id}`}
                        className="text-success"
                        style={{ fontSize: "16px", marginRight: "10px" }}
                      >
                        view
                      </a>
                      <a
                        href={`/dashboard/client/edit/${ele.id}`}
                        className="text-warning"
                        style={{ fontSize: "18px", marginRight: "10px" }}
                      >
                        <AiFillEdit />
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
              totalPosts={allClientData.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;

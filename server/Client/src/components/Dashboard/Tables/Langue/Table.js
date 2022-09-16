import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLangue,
  getAllLangue,
} from "../../../../redux/actions/langue.actions";
import Pagenation from "../../../Pagination/Pagination";

function Table({ name, fieldsTable }) {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const { langueData } = useSelector((state) => state.langue);
  var [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = langueData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllLangue(dispatch);
  }, []);

  //?-------------------------------------
  const handleDelete = (event, id) => {
    event.preventDefault();
    deleteLangue(id, dispatch);
  };

  const search = (rows) => {
    if (q) {
      return rows.filter((row) => {
        return row.langueNom.toLowerCase().includes(q.toLowerCase());
      });
    } else {
      return rows;
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="row my-5">
        <div className="card-hearder mb-3">
          <h4>
            {name} Table
            <a
              href={`/dashboard/langue/add`}
              className="btn btn-primary float-end"
            >
              + add Langue
            </a>
          </h4>
        </div>

        <div className="card-hearder mb-3">
          <input
            className="p-1 form-control w-25"
            placeholder="search langue ..."
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
                    <td>{ele.langueNom}</td>
                    <td scope="col" width="150">
                      <a
                        className="text-danger"
                        style={{ fontSize: "18px" }}
                        onClick={(event) => handleDelete(event, ele.id)}
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
              totalPosts={langueData.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;

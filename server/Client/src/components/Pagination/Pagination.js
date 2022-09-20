import React from "react";

function Pagenation({ postsPerPage, totalPosts, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((ele) => (
          <li key={ele} className="page-item">
            <a
              className="page-link"
              style={{
                color: "#000",
                padding: "0px 10px",
              }}
              onClick={(e) => {
                e.preventDefault();
                paginate(ele);
              }}
            >
              {ele}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagenation;

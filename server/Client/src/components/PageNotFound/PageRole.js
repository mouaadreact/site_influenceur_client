import React from "react";

function PageRole() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">403</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Don't have Role.
        </p>
        <p className="lead">
          Tu n'a pas le role pour acceder a cette page
        </p>
      </div>
    </div>
  );
}

export default PageRole;

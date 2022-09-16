import React from "react";

function PageDejaConnect() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">401</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not Accessible.
        </p>
        <p className="lead">vous avez deja Connect</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default PageDejaConnect;

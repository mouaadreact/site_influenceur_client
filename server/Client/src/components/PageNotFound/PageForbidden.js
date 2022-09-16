import React from "react";

function PageForbidden() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">401</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not Access.
        </p>
        <p className="lead">
          le client doit s'authentifier afin d'obtenir la réponse demandée
        </p>
        <a href="/login" className="btn btn-primary">
          Go Login
        </a>
      </div>
    </div>
  );
}

export default PageForbidden;

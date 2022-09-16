import React, { useContext } from "react";
import NavbarRegister from "../NavBar/NavbarRegister";
import { GiConfirmed } from "react-icons/gi";
import { UidContext } from "../../contexts/AppContext";
import PageDejaConnect from "../PageNotFound/PageDejaConnect";

function VerifierEmail() {
  const id = useContext(UidContext);

  return (
    <>
      <NavbarRegister />
      {id ? (
        <>
          <PageDejaConnect />
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
              <h1 className="display-1 fw-bold text-success">Confirm Email</h1>
              <p className="lead">
                allez a votre boite email pour confimer Register
              </p>
              <p className="fs-3">
                <span className="text-success">
                  <GiConfirmed />
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VerifierEmail;

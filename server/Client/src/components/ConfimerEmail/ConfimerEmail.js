import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ConfirmInstagram from "../ConfimerInstagram/ConfirmInstagram";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmEmail } from "../../redux/actions/register.actions";
import NavbarRegister from "../NavBar/NavbarRegister";
import PageDejaConnect from "../PageNotFound/PageDejaConnect";
import { UidContext } from "../../contexts/AppContext";

function ConfimerEmail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = useContext(UidContext);

  useEffect(() => {
    const Querys = new URLSearchParams(location.search);
    const queryToken = Querys.get("token");
    console.log(queryToken);
    confirmEmail(queryToken, dispatch);
  }, []);

  const handlegetUserId = (e) => {
    e.preventDefault();
    window.location.href = `/register/confirmInstagram?id=${localStorage.getItem(
      "idUser"
    )}`;
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <NavbarRegister />

      {id ? (
        <>
          <PageDejaConnect />
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
              <h1 className="display-1 fw-bold text-success">
                Good Confim your Email
              </h1>
              <p className="fs-3">
                {" "}
                <span className=""> allez Complete votre register</span>
              </p>
              <form onSubmit={(e) => handlegetUserId(e)}>
                <input
                  className="btn btn-success w-30 m-1"
                  stye={{ color: "white" }}
                  type="submit"
                  value="confirmer votre compte"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConfimerEmail;

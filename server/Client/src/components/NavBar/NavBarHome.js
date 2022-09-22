import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
function NavBarHome() {
  return (
    <>
      <nav
        className="primary-bg navbar navbar-light navbar-expand-md py-3"
        style={{
          position: "sticky",
          top: "0",
          right: "0",
          zIndex: "100",
          width: "100%",
        }}
      >
        <div className="container">
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-3"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navcol-3"
            style={{ height: "33px", marginBottom: "0" }}
          >
            <span
              className="navbar-text"
              style={{
                marginLeft: "14px",
                fontWeight: "bold",
                fontFamily: "Ubuntu",
                fontSize: "22px",
                color: "white",
              }}
            >
              <span className="logo" style={{fontSize: "22px"}}>3</span>wdev
            </span>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                {
                  /*
                  <NavLink
                  to="/"
                  className="nav-NavLink"
                  style={{
                    fontFamily: "Ubuntu",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Acceuil
                </NavLink>
                 */
                }
              </li>
            </ul>
            <NavLink to="/login" className="Buttons log">
              Login
            </NavLink>
            <NavLink to="/register" className="Buttons reg">
              Registre
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarHome;

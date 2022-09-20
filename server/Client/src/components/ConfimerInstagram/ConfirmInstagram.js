import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage, prepareDataForValidation } from "formik";
import { basicSchemaConfirmInstagram } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ConfimInstagram.css";
import {
  afficherCompteInstagram,
  validerCompteInstagram,
} from "../../redux/actions/register.actions";
import Loading from "../Loading/Loading";
import { UidContext } from "../../contexts/AppContext";
import NavbarRegister from "../NavBar/NavbarRegister";
import PageDejaConnect from "../PageNotFound/PageDejaConnect";

function ConfirmInstagram() {
  const id = useContext(UidContext);
  const location = useLocation();
  const Querys = new URLSearchParams(location.search);
  const queryId = Querys.get("id");
  let navigate = useNavigate();
  const { loading, instagramData } = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const initialValues = {
    nom: "",
    prenom: "",
    genre: "",
    dateNaissance: "",
    facebookUsernameCompte: "",
    youtubeUsernameCompte: "",
    instagramUsernameCompte: "",
  };
  //on submit afficher instagram data
  const onSubmit = async (values, actions) => {
    console.log(values);
    afficherCompteInstagram(queryId, values, dispatch);
  };
  //on cancel et on confirm instagram data
  const handleCancel = async (e) => {
    e.preventDefault();
    console.log("cancel");
    window.location.reload(false);
  };

  //-------
  //confirm compte
  const handleConfirm = async (e) => {
    e.preventDefault();
    validerCompteInstagram(queryId, dispatch);
  };
  //---------------
  console.log(instagramData);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <NavbarRegister />
          {instagramData.username ? (
            <>
              <form>
              <div className="container-fluid p-3 mt-5">
                <div
                  className="row"
                  style={{
                    justifyContent: "center",
                    fontSize: "15px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div 
                      style={{

                        boxShadow:"1px 1px 20px #DDD",
                        backgroundColor:"#FFF",
                        padding:"20px 20px",
                        borderRadius:"10px"
                        
                        }}
                      className="card-body">
                        <div className="row">
                          <div className="col-sm-12 mb-1">
                            <p className="mb-0 w-100">
                              Is it your compte instagram ?:{" "}
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 mb-1">
                            <p className="mb-0">{instagramData.username}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3 mb-1">
                            <p className="mb-0">Publication : </p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <p className="mb-0 primary-text">{instagramData.publications}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3 mb-1">
                            <p className="mb-0">Abonnées: </p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <p className="mb-0 primary-text">{instagramData.publications}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3 mb-1">
                            <p className="mb-0">Abonnements: </p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <p className="mb-0  primary-text">{instagramData.abonnements}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3 mb-1">
                            <p className="mb-0">full Name: </p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <p className="mb-0  primary-text">{instagramData.full_name}</p>
                          </div>
                        </div>

                        <div className="row">
                        <div className="col-sm-3 mb-1">
                            <p className="mb-0">Description: </p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <p className="mb-0  primary-text">{instagramData.description}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3 mb-1">
                            <p className="mb-0">Link:</p>
                          </div>
                          <div className="col-sm-9 mb-1">
                            <a href={instagramData.link} className="mb-0 primary-text">{instagramData.link}</a>
                          </div>
                        </div>

                        <div className="mb-3 mt-3">
                          <a
                            className="white-text p-1 rounded"
                            style={{
                              backgroundColor: "#01579b",
                              fontWeight: "bold",
                              marginRight: "10px",
                            }}
                            onClick={(e) => handleConfirm(e)}
                          >
                            Confirmer
                          </a>

                          <a
                            className="white-text p-1 rounded"
                            style={{
                              backgroundColor: "#d81b60",
                              fontWeight: "bold",
                              marginRight: "10px",
                            }}
                            onClick={(e) => handleCancel(e)}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="row"></div>
                  </div>
                </div>
              </div>
              </form>
            </>
          ) : (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={basicSchemaConfirmInstagram}
                onSubmit={onSubmit}
              >
                <div className="container w-50 shadow-lg p-3 mb-5 bg-white roundedd mt-5">
                  <div className="text-center p-3">Confirm Instagram</div>

                  <Form>
                    <div className="form-outline mb-4">
                      <label
                        className="form-label label-required"
                        htmlFor="nom"
                      >
                        Nom:
                      </label>
                      <Field
                        type="text"
                        id="nom"
                        name="nom"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="nom" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label
                        className="form-label label-required"
                        htmlFor="prenom"
                      >
                        Prenom:
                      </label>
                      <Field
                        name="prenom"
                        type="text"
                        id="prenom"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="prenom" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="label-required">Genre: </label>
                      <div className="form-check form-check-inline">
                        <Field
                          className="form-check-Field"
                          type="radio"
                          name="genre"
                          id="inlineRadio1"
                          value="homme"
                        />
                        <label
                          className="form-check-label "
                          htmlFor="inlineRadio1"
                        >
                          homme
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <Field
                          className="form-check-Field"
                          type="radio"
                          name="genre"
                          id="inlineRadio2"
                          value="femme"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          femme
                        </label>
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="genre" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label
                        className="form-label label-required"
                        htmlFor="dateNaissance"
                      >
                        Date de naissance:
                      </label>
                      <Field
                        type="date"
                        id="dateNaissance"
                        name="dateNaissance"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="dateNaissance" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label
                        className="form-label"
                        htmlFor="facebookUsernameCompte"
                      >
                        facebook Username:
                      </label>
                      <Field
                        type="text"
                        id="facebookUsernameCompte"
                        name="facebookUsernameCompte"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="facebookUsernameCompte" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label
                        className="form-label"
                        htmlFor="youtubeUsernameCompte"
                      >
                        youtube Username:
                      </label>
                      <Field
                        type="text"
                        id="youtubeUsernameCompte"
                        name="youtubeUsernameCompte"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="youtubeUsernameCompte" />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label
                        className="form-label label-required"
                        htmlFor="instagramUsernameCompte"
                      >
                        Instagram Username:
                      </label>
                      <Field
                        type="text"
                        id="instagramUsernameCompte"
                        name="instagramUsernameCompte"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="instagramUsernameCompte" />
                      </div>
                    </div>

                    <button type="submit" className="btn bleu-btn w-100">
                      Submit
                    </button>
                  </Form>
                </div>
              </Formik>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ConfirmInstagram;

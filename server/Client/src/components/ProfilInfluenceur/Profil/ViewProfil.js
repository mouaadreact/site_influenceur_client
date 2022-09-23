import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneInfluenceurUserId } from "../../../redux/actions/influenceur.actions";
import dateformat from "dateformat";

function ViewProfil({ id }) {
  const dispatch = useDispatch();
  const { oneInfluenceurData } = useSelector((state) => state.influenceur);
  const [langue, setLangue] = useState([]);
  const [interet, setInteret] = useState([]);
 
  useEffect(() => {
    getOneInfluenceurUserId(id, dispatch);
  }, [id]);

  useEffect(() => {
    oneInfluenceurData.Langues?.forEach((ele) => {
      console.log(ele);
      setLangue((prev) => [...prev, ele.langueNom]);
    });

    oneInfluenceurData.Interets?.forEach((ele) => {
      setInteret((prev) => [...prev, ele.interetNom]);
    });
  }, [oneInfluenceurData?.id]);


  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            
            <h5 className="my-3 primary-text">
              {oneInfluenceurData?.instagramUsernameCompte}
            </h5>
            <p className="text-muted mb-1">
              {oneInfluenceurData?.prenom + " " + oneInfluenceurData?.nom}
            </p>
            <p className="text-muted mb-4">{oneInfluenceurData?.profession}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
          
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData &&
                    oneInfluenceurData.User &&
                    oneInfluenceurData.User.email}
                </p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Genre</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.genre}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Date Naissance</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData &&
                    dateformat(oneInfluenceurData.dateNaissance, "yyyy-mm-dd")}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Pays</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.pays}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Ville</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.ville}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Quartier</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.quartier}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Situation Familiale</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.situationFamiliale}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nombre Enfants</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.nombreEnfant}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Niveau Etude</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData && oneInfluenceurData.NiveauEtude?.niveauEtudeNom}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Langues</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {langue.length > 0 && langue.toString()}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Centre Interets</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {interet.length > 0 && interet.toString()}
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Username Facebook</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData &&
                    oneInfluenceurData.facebookUsernameCompte ===null 
                    ? "---"
                    : oneInfluenceurData.facebookUsernameCompte
                    }
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Username Youtube</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {oneInfluenceurData &&
                    oneInfluenceurData.youtubeUsernameCompte ===null 
                    ? "---"
                    : oneInfluenceurData.youtubeUsernameCompte

                    }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
}

export default ViewProfil;

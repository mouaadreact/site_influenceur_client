import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dateformat from "dateformat";
import { getOneInfluenceur } from "../../../../redux/actions/influenceur.actions";
import { getApiInstagramInfluenceur } from "../../../../redux/actions/apiInstagramHistory.actions";

import axios from "axios";
import Sidebar from "../../Sidebar/Sidebar";

function ViewInfluenceur() {
  const dispatch = useDispatch();
  const { loading, oneInfluenceurData } = useSelector(
    (state) => state.influenceur
  );
  const { instagramFilePath } = useSelector((state) => state.apiInstagram);
  const [compteInstagram, setCompteInstagram] = useState({
    nombrepost: 0,
    nombreAbonne: 0,
    nombreAbonnement: 0,
    nombreLike: 0,
    nombreCommentaire: 0,
    urlImage:""
  });

  const params = useParams();

  useEffect(() => {
    getOneInfluenceur(params.id, dispatch);
    getApiInstagramInfluenceur(params.id, dispatch);
  }, []);

  useEffect(() => {
    //console.log(instagramFilePath?.path)
    
    if (instagramFilePath?.path) {
      axios
        .get(instagramFilePath?.path)
        .then((res) => {
         
          //console.log(atob(btoa("user")))
          console.log("data:image/jpg;base64,"+btoa(res.data.data.profile_pic_url))
          var CommentCount = 0;
          var LikeCount = 0;
          
          for (
            var i = 0;
            i < res.data.data.edge_owner_to_timeline_media.edges.length;
            i++
          ) {
            CommentCount +=
              res.data.data.edge_owner_to_timeline_media.edges[i].node
                .edge_media_to_comment.count;
            LikeCount +=
              res.data.data.edge_owner_to_timeline_media.edges[i].node.edge_liked_by
                .count;
          }

          for (
            var i = 0;
            i < res.data.data.edge_felix_video_timeline.edges.length;
            i++
          ) {
            CommentCount +=
              res.data.data.edge_felix_video_timeline.edges[i].node
                .edge_media_to_comment.count;
            LikeCount +=
              res.data.data.edge_felix_video_timeline.edges[i].node.edge_liked_by
                .count;
          }
          setCompteInstagram({
            nombrepost: res.data.data.edge_owner_to_timeline_media.count,
            nombreAbonne: res.data.data.edge_followed_by.count,
            nombreAbonnement: res.data.data.edge_follow.count,
            nombreCommentaire: CommentCount,
            nombreLike: LikeCount,
            urlImage:"data:image/png;base64, "+btoa(res.data.data.profile_pic_url)
          });
        })
        .catch((err) => console.log(err));
    }
  }, [instagramFilePath?.path]);



  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div
        className="container-fluid px-4"
        style={{ backgroundColor: "#EB6E35" }}
      >
        <div className="container mt-5 w-100 mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Influenceur View Details
                   
                  </h4>
                  
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label>Influenceur ID:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.id}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur Status active/desactive Compte :</label>
                    <p
                      className="form-control"

                     style={
                        oneInfluenceurData.statusEtatActiver == true
                        ?
                         {backgroundColor:"#44e4a0"}
                        :
                        {backgroundColor:"#d9374e"}

                      }
                    >
                      {oneInfluenceurData.statusEtatActiver == true
                        ? "Active"
                        : "Desactive"}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur Username Instagram:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.instagramUsernameCompte}
                    </p>
                  </div>

                  <div className="row g-3 my-2">
                    <div className="col-md-3">
                      <div className="p-3 card-blue shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                          <h3 className="fs-2 white-text">
                            {new Intl.NumberFormat("de-DE").format(
                              compteInstagram.nombrepost
                            )}
                          </h3>
                          <p className="fs-5 white-text">Post</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="p-3 card-red shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                          <h3 className="fs-2 white-text">
                            {new Intl.NumberFormat("de-DE").format(
                              compteInstagram.nombreAbonne
                            )}
                          </h3>
                          <p className="fs-5 white-text">Abonne</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="p-3 card-green shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                          <h3 className="fs-2 white-text">
                            {new Intl.NumberFormat("de-DE").format(
                              compteInstagram.nombreAbonnement
                            )}
                          </h3>
                          <p className="fs-5 white-text">Abonnement</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="p-3 card-blue shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                          <h3 className="fs-2 white-text">
                            {new Intl.NumberFormat("de-DE").format(
                              compteInstagram.nombreLike
                            )}
                          </h3>
                          <p className="fs-5 white-text">
                            Likes of last 12 posts
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="p-3 card-other shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                          <h3 className="fs-2 white-text">
                            {new Intl.NumberFormat("de-DE").format(
                              compteInstagram.nombreCommentaire
                            )}
                          </h3>
                          <p className="fs-5 white-text">
                            Commentaires of last 12 posts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur full name: </label>
                    <p
                      className="form-control "
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {`${oneInfluenceurData.nom} ${oneInfluenceurData.prenom}`}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur Email : </label>
                    <p
                      className="form-control "
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.User?.email}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur genre :</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.genre}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur dateNaissance: </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {dateformat(
                        oneInfluenceurData.dateNaissance,
                        "dd/mm/yyyy"
                      )}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur pays:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.pays}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur ville: </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.ville}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur Quartier:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.quartier}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur situation familiale:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.situationFamiliale}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur nombre des enfants:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.nombreEnfant}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur niveau d'etude:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData?.NiveauEtude?.niveauEtudeNom}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur profession:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.profession}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Influenceur commentaire:</label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.commentaire
                        ? oneInfluenceurData.commentaire
                        : "------"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur date de creer le compte : </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {dateformat(oneInfluenceurData.createdAt, "dd/mm/yyyy")}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur date editer le compte : </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {dateformat(oneInfluenceurData.updatedAt, "dd/mm/yyyy")}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur langues : </label>
                    {oneInfluenceurData.Langues?.map((ele, index) => {
                      return (
                        <p
                          key={index + 1}
                          className="form-control"
                          style={{ backgroundColor: "#DDD" }}
                        >
                          {ele.langueNom}
                        </p>
                      );
                    })}
                  </div>

                  <div className="mb-3">
                    <label>Influenceur interets : </label>
                    {oneInfluenceurData.Interets?.map((ele, index) => {
                      return (
                        <p
                          key={index + 1}
                          className="form-control"
                          style={{ backgroundColor: "#DDD" }}
                        >
                          {ele.interetNom}
                        </p>
                      );
                    })}
                  </div>

                  <div className="mb-3">
                    <label>Influenceur facebook compte : </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.facebookUsernameCompte
                        ? oneInfluenceurData.facebookUsernameCompte
                        : "-------"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Influenceur youtube compte : </label>
                    <p
                      className="form-control"
                      style={{ backgroundColor: "#DDD" }}
                    >
                      {oneInfluenceurData.youtubeUsernameCompte
                        ? oneInfluenceurData.youtubeUsernameCompte
                        : "-------"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInfluenceur;

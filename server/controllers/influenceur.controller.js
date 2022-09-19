const {
  Influenceur,
  User,
  LangueInfluenceur,
  Interet,
  Langue,
  ApiInstagramHistory,
  InteretInfluenceur,
  NiveauEtude,
} = require("../models");
const SchemaValidation = require("../validators/influenceur.validator");
const UsernameByEmail = require("../utils/usernameByEmail");
const axios = require("axios");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY_AUTHORIZATION;
const FormatDate = require("../utils/formatDate");
// https://rapidapi.com/yuananf/api/instagram28/

//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//------------------------------------------

//valider compte de temporaireInfluenceur
//j'aime l'ajoute de token dans la base de données
//email envoye link comme:
// http://localhost:3000/api/v1/influenceur/confirmer-email?email=**

exports.validerCompteParEmail = async (req, res) => {
  const { token } = req.query;
  const { id, email, role } = jwt.verify(token, privateKey);

  const UserInf = await User.findOne({
    where: {
      email,
    },
  });

  if (UserInf) {
    const user = await User.update(
      {
        isInfluenceur: true,
      },
      {
        where: {
          email,
          id,
        }, 
      }
    );

    if (!user) {
      res.status(400).json({ error: "error in register etape 1 ! " });
    } else {
      //in test check user active or not ???
      try {
        const influenceur = await Influenceur.create({
          UserId: UserInf.id,
          statusValideInstagramCompte: false,
          statusAccepterConditionGenerale: false,
          statusEtatActiver: false,
          statusIsComplete: false,
        });
        if (influenceur) {
          res.status(200).json(influenceur);
        } else {
          res.status(400).json({ err: "error in creation influenceur!" });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    }
  } else {
    res.status(400).json({
      error:
        "Vous avez besoin de registrer dans le site Or vous etes deja confirmer votre email! ",
    });
  }
};

//-----------------------------------------------------------
//complete etape 2: valideCompte Instg: (afficher data userInstagram)

exports.afficherCompteInstagram = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      genre,
      dateNaissance,
      facebookUsernameCompte,
      youtubeUsernameCompte,
      instagramUsernameCompte, //add after compte youtube,facebook
    } = req.body;

    const obj = {};
    obj.nom = nom;
    obj.prenom = prenom;
    obj.genre = genre;
    obj.dateNaissance = dateNaissance;
    obj.instagramUsernameCompte = instagramUsernameCompte;

    if (
      facebookUsernameCompte !== null &&
      facebookUsernameCompte !== undefined &&
      facebookUsernameCompte !== ""
    ) {
      obj.facebookUsernameCompte = facebookUsernameCompte;
    }
    if (
      youtubeUsernameCompte !== null &&
      youtubeUsernameCompte !== undefined &&
      youtubeUsernameCompte !== ""
    ) {
      obj.youtubeUsernameCompte = youtubeUsernameCompte;
    }

    const data = await Influenceur.update(obj, {
      where: { id: req.params.id },
    });

    if (data <= 0) {
      res.status(400).json({ error: "On peut pas valideCompte instagram!" });
    } else {
      try {
        //change forma
        const options = {
          method: "GET",
          url: `${process.env.INSTAGRAM_API_URL}`,
          params: { username: `${instagramUsernameCompte}` },
          headers: {
            "X-RapidAPI-Key": `${process.env.INSTAGRAM_API_HEADER_KEY}`,
            "X-RapidAPI-Host": `${process.env.INSTAGRAM_API_HEADER_HOST}`,
          },
        };

        var UserApiInfo = await axios.request(options);
        //console.log(UserApiInfo.data)
        //change forma:
        var UserAPI = UserApiInfo.data;

        if (!UserAPI) {
          res
            .status(400)
            .json({ err: "on peut pas envoyer Instagram Info ! " });
        } else {
          res.status(200).json({
            username:
              UserAPI.edge_owner_to_timeline_media.edges[0].node.owner.username,
            image: UserAPI.profile_pic_url,
            publications: UserAPI.edge_owner_to_timeline_media.count,
            abonnes: UserAPI.edge_followed_by.count,
            abonnements: UserAPI.edge_follow.count,
            full_name: UserAPI.full_name,
            description: UserAPI.biography,
            link: UserAPI.external_url,
          });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//---------------------------------------------------------------
//valide Status
exports.valideCompteInstagram = async (req, res) => {
  try {
    const data = await Influenceur.update(
      {
        statusValideInstagramCompte: true,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!data) {
      res.status(400).json({ err: "on peut pas valider CompteInstag " });
    } else {
      res.status(200).json(data);

      //------------------------------ add compte instagram
      try {
        let data = await Influenceur.findOne({
          where: { id: req.params.id },
        });

        data = data.dataValues;
        console.log(data);
        const options = {
          method: "GET",
          url: `${process.env.INSTAGRAM_API_URL}`,
          params: { username: `${data.instagramUsernameCompte}` },
          headers: {
            "X-RapidAPI-Key": `${process.env.INSTAGRAM_API_HEADER_KEY}`,
            "X-RapidAPI-Host": `${process.env.INSTAGRAM_API_HEADER_HOST}`,
          },
        };
        console.log(options);
        var UserApiInfo = await axios.request(options);
        var UserAPI = UserApiInfo.data;
        if (!UserAPI) {
          res
            .status(400)
            .json({ err: "on peut pas envoyer Instagram Info ! " });
        } else {
          /* enregistrer Api so form json dans Uploads->Api */
          /*  var dir=`uploads/Api/${data.instagramUsernameCompte}`
           if (!fs.existsSync(dir)){
             fs.mkdirSync(dir); 
           }*/

          //----
          fs.writeFile(
            `uploads/Api/${data.instagramUsernameCompte}_${
              req.params.id
            }_${FormatDate(new Date())}.json`,
            JSON.stringify(UserAPI, null, 2),
            async (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("file write successful !! ");
                const result = await ApiInstagramHistory.create({
                  InfluenceurId: req.params.id,
                  path: `${process.env.URL_SERVER}:${
                    process.env.PORT
                  }/api/v1/Api/${req.params.id}/${
                    data.instagramUsernameCompte
                  }_${req.params.id}_${FormatDate(new Date())}.json`,
                });
                if (result) {
                  console.log("resultat enregsitrer");
                }
              }
            }
          );
        }
      } catch (err) {
        res.status(400).json(err);
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//--------------------------------------------------------------
//ajouter commentaire prive
//valide Status
exports.ajouterCommentaire = async (req, res) => {
  try {
    const { commentaire } = req.body;
    const data = await Influenceur.update(
      {
        commentaire,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!data) {
      res
        .status(400)
        .json({ err: "on peut pas Ajouter commentaire pour l'Influenceur " });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//-------------------------------------------------------------------
//completer le compte d'influenceur
exports.completerProfil = async (req, res) => {
  try {
    const {
      pays,
      ville,
      quartier,
      situationFamiliale,
      nombreEnfant,
      profession,
      langue,
      interet,
      NiveauEtudeId,
    } = req.body;

    const data = await Influenceur.update(
      {
        pays,
        ville,
        quartier,
        situationFamiliale,
        nombreEnfant,
        profession,
        NiveauEtudeId:parseInt(NiveauEtudeId),
        statusIsComplete: true,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (data <= 0) {
      res.status(400).json({ error: "On peut pas complete Compte!" });
    } else {
      //--add langue
      let langueReq = [];
      langue.forEach((ele) => {
        langueReq.push({ LangueId: ele, InfluenceurId: req.params.id });
      });
      const langueData = await LangueInfluenceur.bulkCreate(langueReq);
      if (langueData) {
        console.log("add succes langue data");
      }
      //------------------------------------
      //-add interet
      let interetReq = [];
      interet.forEach((ele) => {
        interetReq.push({ InteretId: ele, InfluenceurId: req.params.id });
      });

      const interetData = await InteretInfluenceur.bulkCreate(interetReq);
      if (interetData) {
        console.log("add succes interet data");
      }

      if (langueData && interetData) {
        res.status(200).json(data);
      } else {
        res
          .status(400)
          .json({ err: "erreur a l ajoute de langues et interets" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//----------------------------------------------------
//accepter les conditions generale:
exports.accepterConditionGenerale = async (req, res) => {
  try {
    const data = await Influenceur.update(
      {
        statusAccepterConditionGenerale: true,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!data) {
      res.status(400).json({
        error: "On peut pas accepter condition genrale d'influenceur!",
      });
    } else {
      res.status(200).json(data);

      const active = await Influenceur.update(
        {
          statusEtatActiver: true,
        },
        { where: { id: req.params.id } }
      );
      if (active) {
        console.log("active ok !");
      } else {
        console.log("not active ! ");
      }
    }
  } catch (err) {
    res.status(400).json({ err: err.errors[0].message });
  }
};

//-----------------------------------------------------
//activer/desactiver le compte influenceur:
exports.changeEtatActiveCompte = async (req, res) => {
  try {
    //send active or not
    const { statusEtatActiver } = req.body;
    const data = await Influenceur.update(
      {
        statusEtatActiver,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!data) {
      res.status(400).json({
        error: "On peut pas activer/desactiver Compte d'influenceur!",
      });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({ err: err.errors[0].message });
  }
};

//----------------------------------------------------------
//afficher tout les influenceurs
exports.getAll = async (req, res) => {
  try {
    const data = await Influenceur.findAll({
      include: [User, Interet, Langue, NiveauEtude],
    });
    if (!data) {
      res.status(400).json({ error: "les influenceurs sont introuvables !" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({ err: err.errors[0].message });
  }
};
//------------------------------------

//afficher tout une influenceur BY id
exports.getId = async (req, res) => {
  try {
    const data = await Influenceur.findOne({
      where: { id: req.params.id },
      include: [User, Interet, Langue,NiveauEtude],
    });

    if (!data) {
      res.status(400).json({ error: "l'influenceur est introuvable!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//-------------------------------------------

//afficher tout une influenceur BY UserID
exports.getByUserId = async (req, res) => {
  try {
    const data = await Influenceur.findOne({
      where: { UserId: req.params.id },
      include: [User, Interet, Langue,NiveauEtude],
    });

    if (!data) {
      res.status(400).json({ error: "l'influenceur est introuvable!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//-------------------------------------------

//filtrage : age,ville,quartier,genre,situation familiale,
//niveau d'etude,langue

exports.filtrage = async (req, res) => {
  try {
    const {
      ville,
      statusEtatActiver,
      quartier,
      genre,
      ageMin,
      ageMax,
      situationFamiliale,
      NiveauEtudeId,
      langue,
      interet,
    } = req.body;

    console.log(req.body);
    var obj = {};
    if (ville) {
      obj.ville = ville.toUpperCase();
    }
    if (quartier) {
      obj.quartier = quartier.toUpperCase();
    }
    //*----------------------------
    if (statusEtatActiver === "true") {
      obj.statusEtatActiver = true;
    }
    if (statusEtatActiver === "false") {
      obj.statusEtatActiver = false;
    }
    //*-------------------------------
    if (genre) {
      obj.genre = genre;
    }
    if (situationFamiliale) {
      obj.situationFamiliale = situationFamiliale;
    }

    if (NiveauEtudeId) {
      obj.NiveauEtudeId =parseInt(NiveauEtudeId);
    }

   obj.statusEtatActiver=true

    var data = await Influenceur.findAll({
      where: obj,
      include: [Langue, Interet, User],
    });
    if (!data) {
      res.status(400).json({ error: "On peut pas filtrer Influenceur !" });
    } else {
      //*---------------------------------------
      //*interet:
      if (interet?.length > 0) {
        console.log("interet");
        data = data.filter((ele) => {
          let ok = false;

          for (let i = 0; i < ele.dataValues.Interets.length; i++) {
            interet.forEach((itr) => {
              if (itr == ele.dataValues.Interets[i].id) {
                ok = true;
              }
            });
            if (interet.length == 0) {
              ok = true;
            }
          }
          return ok;
        });
      }

      //*--------------------------------------
      //*langues:
      if (langue?.length > 0) {
        console.log("langue");
        data = data.filter((ele) => {
          let ok = false;

          for (let i = 0; i < ele.dataValues.Langues.length; i++) {
            langue.forEach((itr) => {
              if (itr == ele.dataValues.Langues[i].id) {
                ok = true;
              }
            });
            if (langue.length == 0) {
              ok = true;
            }
          }
          return ok;
        });
      }

      if (ageMin) {
        data = data.filter((ele) => {
          var YearDateNaissance = ele.dataValues.dateNaissance.getFullYear();
          return (
            new Date().getFullYear() - YearDateNaissance >= ageMin &&
            new Date().getFullYear() - YearDateNaissance <= ageMax
          );
        });
      }

      //----------------------------------------
      //console.log(data);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//----------------------------------------
//editer un influenceur
exports.update = async (req, res) => {
  try {
    const {
      email,
      password,
      nom,
      prenom,
      genre,
      dateNaissance,
      instagramUsernameCompte,
      pays,
      ville,
      quartier,
      situationFamiliale,
      nombreEnfant,
      NiveauEtudeId,
      profession,
      token,
      commentaire,
    } = req.body;

    const data = await Influenceur.update(
      {
        email,
        password,
        nom,
        prenom,
        genre,
        dateNaissance,
        instagramUsernameCompte,
        pays,
        ville,
        quartier,
        situationFamiliale,
        nombreEnfant,
        NiveauEtudeId,
        profession,
        token,
        commentaire,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (data <= 0) {
      res.status(400).json({ error: "On peut pas editer l'influenceur!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//supprimer l'influenceur
exports.delete = async (req, res) => {
  try {
    const data = await Influenceur.destroy({
      where: { id: req.params.id },
    });

    if (!data) {
      res.status(400).json({ error: "On peut pas supprimer l'influenceur!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({ err: err});
  }
};

//!------------------------------------------------------

//* get count of all influenceur
exports.getCountAllInfluenceur = async (req, res) => {
  try {
    const data = await Influenceur.count();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};


//!-----------------------------------------------
//*get influenceurs qui ont compte active:
//statusEtatActiver

exports.getAllInfluenceurActiveCompte=async (req,res)=>{
  try{
   const data=await Influenceur.findAll({
      where:{
        statusEtatActiver:true
      },
      include: [User, Interet, Langue, NiveauEtude]
   });

   console.log(data)

   if (!data) {
    res.status(400).json({ error: "On peut pas trouver les comptes active des'influenceurs!" });
  } else {
    res.status(200).json(data);
  }

  }catch(err){
    res.status(400).json({ err: err });
  }
}


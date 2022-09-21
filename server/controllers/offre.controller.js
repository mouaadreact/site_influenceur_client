const {
  Offre,
  Influenceur,
  Campagne,
  Client,
  NiveauEtude,
} = require("../models");
const Op = require("Sequelize").Op;
const { QueryTypes } = require("Sequelize");
const sequelize = require("../config/db");
const { SendOffre } = require("../utils/SendMailOffreToInfluenceurs");
const { SendRappel } = require("../utils/sendMailRappelOffre");
//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter Offre:
/*exports.addOffre=async (req,res)=>{
   
 //const {listInfluenceur}=req.body;
  try{ 
   const data=await Offre.create({
                          CampagneId:req.params.campagneId,
                          InfluenceurId:req.params.influenceurId,
                          status:"En cours traitement"
                                })
       
    if(!data){
      res.status(400).json({message:"On peut pas créer  offre!"});
    }else{
      res.status(200).json(data);
    }

  }catch(err){
   res.status(400).json(err);
  }
}*/

exports.addOffre = async (req, res) => {
  const { listInfluenceur, CampagneId } = req.body;

  //block
  try {
    const oldOffre = await sequelize.query(
      ` 
    SELECT * FROM offres o , campagnes c , influenceurs i,users u
    WHERE  
    o.CampagneId=${parseInt(CampagneId)}
    AND o.CampagneId=c.id 
    AND i.id=o.InfluenceurId
    AND i.UserId=u.id`,
      { type: QueryTypes.SELECT }
    );

    console.log(oldOffre);

    if (oldOffre.length == 0) {
      try {
        listInfluenceur.forEach(async (ele) => {
          const resultatOffre = await Offre.create({
            CampagneId: parseInt(CampagneId),
            InfluenceurId: ele.id,
            status: "En cours traitement",
          });

          if (!resultatOffre) {
            console.log(`error in add offre `);
          } else {
            console.log(`success add offre`);
          }
        });

        SendOffre(
          listInfluenceur,
          `${oldOffre[0].titre}`,
          `${oldOffre[0].descriptionOffre}`
        );
        res.status(200).json({ message: "add offresuccess" });
      } catch (err) {
        res.status(400).json(err);
      }
    //*-----------

    } else {
      //*old email
      const mails = [];
      oldOffre.forEach((ele, index) => {
        mails.push(ele.email);
      });


      //* rappel mail
      const dataInfluenceurBesoinSendOffre=await sequelize.query(
        ` 
      SELECT * FROM offres o , campagnes c , influenceurs i,users u
      WHERE  
      o.CampagneId=${parseInt(CampagneId)}
      AND o.status <> "Accepter" 
      AND o.status <> "Refuser"
      AND o.CampagneId=c.id 
      AND i.id=o.InfluenceurId
      AND i.UserId=u.id`,
        { type: QueryTypes.SELECT }
      );

      const Rappelmail = [];
      dataInfluenceurBesoinSendOffre.forEach((ele, index) => {
        Rappelmail.push(ele.email);
      });

      //?send mail rappel to old influenceur
      SendRappel(Rappelmail, oldOffre[0].titre, oldOffre[0].descriptionOffre);
      //****************************************
      const newListInfluenceur = [];
      listInfluenceur.forEach((ele) => {
        let ok = true;
        for (let i = 0; i < mails.length; i++) {
          if (mails[i] === ele.email) {
            ok = true;
            break;
          } else {
            ok = false;
          }
        }
        if (ok === false) {
          newListInfluenceur.push(ele);
        }
      });
      //?send mail offre for new Infleunceur
      try {
        newListInfluenceur.forEach(async (ele) => {
          const resultatOffre = await Offre.create({
            CampagneId: parseInt(CampagneId),
            InfluenceurId: ele.id,
            status: "En cours traitement",
          });

          if (!resultatOffre) {
            console.log(`error in add new offre `);
          } else {
            console.log(`success add new offre`);
          }
        });

        SendOffre(
          newListInfluenceur,
          oldOffre[0].titre,
          oldOffre[0].descriptionOffre
        );
        res.status(200).json({ message: "add offresuccess" });
      } catch (err) {
        res.status(400).json(err);
      }
    }
  } catch (err) {}
};

//!----------------------------------------------
// afficher tout les offres
exports.getAll = async (req, res) => {
  try {
    //const data=await Offre.findAll();
    const data = await sequelize.query(
      ` 
  SELECT * FROM offres o , campagnes c , influenceurs i 
  WHERE 
  o.CampagneId=c.id 
  AND 
  i.id=o.InfluenceurId`,
      { type: QueryTypes.SELECT }
    );

    if (!data) {
      res.status(400).json({ error: "les Offres sont introuvables!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//------------------------------------------------------
//afficher l'offre by id
exports.getId = async (req, res) => {
  try {
    const data = await Offre.findOne({
      where: {
        CampagneId: req.params.campagneId,
        InfluenceurId: req.params.influenceurId,
      },
    });

    if (!data) {
      res.status(400).json({ error: "trouve l'Offre!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//!---------------------------------------------------------

//afficher l'offre by id
exports.getCampagneId = async (req, res) => {
  try {
    const data = await sequelize.query(
      ` 
      SELECT * FROM offres o , campagnes c , influenceurs i
      WHERE  o.CampagneId=c.id 
      AND i.id=o.InfluenceurId
      AND o.CampagneId=${req.params.campagneId}`,
      { type: QueryTypes.SELECT }
    );

    if (!data) {
      res.status(400).json({ error: "trouve l'Offre using campagne Id!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//!----------------------------------------------------------
//afficher l'offre by id
exports.getOffreAccepterByInfluenceurId = async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT * FROM offres o , campagnes c WHERE o.status='Accepter' AND  o.InfluenceurId=${req.params.influenceurId} AND o.CampagneId=c.id`,
      { type: QueryTypes.SELECT }
    );

    if (!data) {
      res
        .status(400)
        .json({ error: "trouve l'Offre accepter using Influenceur Id!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//--------------------------------------------------------------
//no means i change this after
exports.update = async (req, res) => {
  try {
    const data = await Offre.update(
      {
        status: req.body.status,
      },
      {
        where: {
          CampagneId: req.params.campagneId,
          InfluenceurId: req.params.influenceurId,
        },
      }
    );

    if (!data) {
      res.status(400).json({ error: "on peut pas editer offre!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//---------------------------------------------
//change new to old offre:

exports.newOffre = async (req, res) => {
  try {
    const data = await sequelize.query(
      `
   
    SELECT * FROM offres o , campagnes c 
    WHERE (o.status="En cours Traitement" 
    OR o.status="Late")
    AND o.InfluenceurId=${req.params.influenceurId} 
    AND o.CampagneId=c.id `,
      { type: QueryTypes.SELECT }
    );

    if (!data) {
      res.status(400).json({ error: "Not found new Offre!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//-----------------------------------------------
//accepter offre:
exports.accepterOffre = async (req, res) => {
  const campagneData = await Campagne.findOne({
    where: {
      id: req.params.campagneId,
    },
  });

  Offre.count({
    where: {
      status: "Accepter",
      CampagneId: req.params.campagneId,
    },
  })
    .then(async (countOffreAccepter) => {
      if (campagneData.nombreInfluenceur - 1 > countOffreAccepter) {
        try {
          const data = await Offre.update(
            {
              status: "Accepter",
            },
            {
              where: {
                CampagneId: req.params.campagneId,
                InfluenceurId: req.params.influenceurId,
              },
            }
          );

          if (!data) {
            res.status(400).json({ error: "On peut pas accepter l'offre!" });
          } else {
            res.status(200).json(data);
          }
        } catch (err) {
          res.status(400).json(err);
        }
      } else if (campagneData.nombreInfluenceur - 1 === countOffreAccepter) {
        try {
          console.log("ele -1 ");
          const data = await Offre.update(
            {
              status: "Accepter",
            },
            {
              where: {
                CampagneId: req.params.campagneId,
                InfluenceurId: req.params.influenceurId,
              },
            }
          );

          if (!data) {
            res.status(400).json({ error: "On peut pas accepter l'offre!" });
          } else {
            console.log("update offre to late");
            res.status(200).json(data);

            const updateData = await Offre.findAll({
              where: {
                CampagneId: req.params.campagneId,
                status: "En cours traitement",
              },
            });

            updateData.forEach(async (ele) => {
              const resultat = await Offre.update(
                {
                  status: "Late",
                },
                {
                  where: {
                    CampagneId: ele.dataValues.CampagneId,
                    InfluenceurId: ele.dataValues.InfluenceurId,
                  },
                }
              );
            });
          }
        } catch (err) {
          res.status(400).json(err);
        }
      } else {
        res.status(200).json({
          message: "tu peux pas accepter cette offre il est deja saturé",
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//-----------------------------------------------
//refuser offre:

exports.refuserOffre = async (req, res) => {
  const campagneData = await Campagne.findOne({
    where: {
      id: req.params.campagneId,
    },
  });

  Offre.count({
    where: {
      status: "Accepter",
      CampagneId: req.params.campagneId,
    },
  })
    .then(async (countOffreAccepter) => {
      if (countOffreAccepter < campagneData.nombreInfluenceur) {
        try {
          const data = await Offre.update(
            {
              status: "Refuser",
            },
            {
              where: {
                CampagneId: req.params.campagneId,
                InfluenceurId: req.params.influenceurId,
              },
            }
          );

          if (!data) {
            res.status(400).json({ error: "On peut pas Refuser l'offre!" });
          } else {
            res.status(200).json(data);
          }
        } catch (err) {
          res.status(400).json(err);
        }
      } else {
        res.status(200).json({
          message: "tu peux pas Refuser cette offre il est deja saturé",
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//-----------------------------------------------
//supprimer offre
exports.delete = async (req, res) => {
  try {
    const data = await Offre.destroy({
      where: {
        CampagneId: req.params.campagneId,
        InfluenceurId: req.params.influenceurId,
      },
    });

    if (!data) {
      res.status(400).json({ error: "on peut pas supprimer offre!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//!---------------------------------------------------
exports.changeDontShow = async (req, res) => {
  try {
    const data = await Offre.update(
      {
        status: "DontShow",
      },
      {
        where: {
          CampagneId: req.params.campagneId,
          InfluenceurId: req.params.influenceurId,
        },
      }
    );
    if (!data) {
      res.status(400).json({ err: "can t don t show offre" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
//!------------------------------------------------------

//* get count of all offre
exports.getCountAllOffre = async (req, res) => {
  try {
    const data = await Offre.count();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

//!--------------------------------------------------------

exports.getData = async (req, res) => {
  try {
    //data etat paiment
    /*  const data=await Campagne.findAll({
    include:[
      {
      model:Influenceur,
      required:false,
      include:[NiveauEtude]
    }]
   });*/

    const data = await sequelize.query(
      ` 
   SELECT * FROM offres o , campagnes c , influenceurs i
   WHERE  o.CampagneId=c.id 
   AND i.id=o.InfluenceurId`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

//**************************************************************

//afficher l'offre by id
exports.getNombreOffrePourChaqueMonthYear = async (req, res) => {
  try {
    const data = await sequelize.query(
      `select count(*) as nombre , MONTH(createdAt) as month,YEAR(createdAt) as year from campagnes c
      where id in (select CampagneId from offres ) 
      group by 
      MONTH(createdAt),YEAR(createdAt)`,
      { type: QueryTypes.SELECT }
    );

    if (!data) {
      res.status(400).json({ error: "cant find nombre of offre!" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

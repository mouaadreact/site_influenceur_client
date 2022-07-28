const Sequelize=require("sequelize")
const db=require("../config/db");

//-----------models:
//InstagramAPIHistorique on a pas besoin de garder en base de donnee
//on enregister seulement dans folder 
//API->InstagramAPI->ID_UsernameFolder->ID(usernameINfluenceur)_date.json


const ClientModel=require("./client.model");
const InfluenceurModel=require("./influenceur.model");
const InteretModel=require("./interet.model");
const LangueModel=require("./langue.model");
const ManagerModel=require("./manager.model");
const TemporaireInfluenceurModel=require("./temporaireInfluenceur.model");
//--models have foreign key
const CampagneModel=require("./campagne.model");
const GalerieCampagneModel=require("./galerieCampagne.model");


//----------create Model:
const Client=ClientModel(db,Sequelize);
const Influenceur=InfluenceurModel(db,Sequelize);
const Interet=InteretModel(db,Sequelize);
const Langue=LangueModel(db,Sequelize);
const Manager=ManagerModel(db,Sequelize);
const TemporaireInfluenceur=TemporaireInfluenceurModel(db,Sequelize);
const Campagne=CampagneModel(db,Sequelize);
const GalerieCampagne=GalerieCampagneModel(db,Sequelize);

//--models nouveau apres relation many to many entre:

   //--offre (campagne , influenceur)
   const Offre=db.define("Offre",{
    statusAccepter:{
     type:Sequelize.BOOLEAN,
     allowNull:true,
     default:false,
    },
    statusNouveau:{
     type:Sequelize.BOOLEAN,
     allowNull:true,
     default:true,
    }
  });
   // etatPaiment(campagne, influenceur)
  const EtatPaiment=db.define("EtatPaiment",{
    tarif:{
     type:Sequelize.DOUBLE,
     allowNull:false
    },
    dateReglement:{ 
     type:Sequelize.DATE,
     allowNull:false,
     validate:{
      customValidator(value){
        if(new Date(value)<new Date()){
          throw new Error("invalid date")
           }
        }
      }
    }
  });
  
   // interetInfluenceur (interet,influenceur)
  const InteretInfluenceur=db.define("InteretInfluenceur");
  //langueInfluenceur (langue,influenceur)
  const LangueInfluenceur=db.define("LangueInfluenceur");
  //interetCampagne (interet,campagne)
  const InteretCampagne=db.define("InteretCampagne");

//relationships between Tables:

//(One->Many)

  
  Client.hasMany(Campagne,{
    onDelete:"CASCADE",
    onUpdate: "CASCADE",
  })

  Campagne.belongsTo(Client,{
    onDelete:"CASCADE",
    onUpdate: "CASCADE",
  })
  
  //-------- 
  Campagne.hasMany(GalerieCampagne,{
    onDelete:"CASCADE",
    onUpdate: "CASCADE",
  })
  GalerieCampagne.belongsTo(Campagne,{
    onDelete:"CASCADE",
    onUpdate: "CASCADE",
  })

  
 

//(Many->Many)::
Langue.belongsToMany(Influenceur ,{through:LangueInfluenceur})
Influenceur.belongsToMany(Langue ,{through:LangueInfluenceur})

Campagne.belongsToMany(Interet ,{through:InteretCampagne})
Interet.belongsToMany(Campagne ,{through:InteretCampagne});

Campagne.belongsToMany(Influenceur ,{through:Offre})
Influenceur.belongsToMany(Campagne ,{through:Offre})

Campagne.belongsToMany(Influenceur,{through:EtatPaiment})
Influenceur.belongsToMany(Campagne ,{through:EtatPaiment})

Influenceur.belongsToMany(Interet ,{through:InteretInfluenceur})
Interet.belongsToMany(Influenceur ,{through:InteretInfluenceur});

 
//generate Tables in DB
db.sync({force:false}).then(()=>{
    console.log("Tables Created ! ");
})

module.exports={
    Client,
    Influenceur,
    Interet, 
    Langue,
    Manager,
    TemporaireInfluenceur,
    Campagne,
    GalerieCampagne,
    Offre,
    EtatPaiment,
    InteretCampagne,
    InteretInfluenceur,
    LangueInfluenceur
}
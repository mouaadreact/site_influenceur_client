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
const UserModel=require("./user.model");
//--models have foreign key
const CampagneModel=require("./campagne.model");
const GalerieCampagneModel=require("./galerieCampagne.model");
const ApiInstagramHistoryModel=require("./apiInstagramHistory");
const RoleModel=require("./role.model");
const NiveauEtudeModel=require('./niveauEtude.model');

//----------create Model:
const Client=ClientModel(db,Sequelize);
const Influenceur=InfluenceurModel(db,Sequelize);
const Interet=InteretModel(db,Sequelize);
const Langue=LangueModel(db,Sequelize);
const User=UserModel(db,Sequelize);
const Campagne=CampagneModel(db,Sequelize);
const GalerieCampagne=GalerieCampagneModel(db,Sequelize);
const ApiInstagramHistory=ApiInstagramHistoryModel(db,Sequelize);
const NiveauEtude=NiveauEtudeModel(db,Sequelize);
const Role=RoleModel(db,Sequelize);

//--models nouveau apres relation many to many entre:

   //--offre (campagne , influenceur)
   const Offre=db.define("Offre",{
    status:{
     type:Sequelize.STRING(250),
     allowNull:true,
     default:false,
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
//-----
//influenceur - apiInstagramHistory

Influenceur.hasMany(ApiInstagramHistory,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})
ApiInstagramHistory.belongsTo(Influenceur,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})
//niveau etude influenceur:

NiveauEtude.hasMany(Influenceur,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})
Influenceur.belongsTo(NiveauEtude,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})


//user - role (utilise ca pour eviter d avoir 2 table)
//temporaire influceur et manager donc on utlise ca avec table de role
Role.hasMany(User,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})
User.belongsTo(Role,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
})

//-----
//influenceur et user:
User.hasOne(Influenceur,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name:'UserId',
    unique:true
  }
})
Influenceur.belongsTo(User,{
  onDelete:"CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name:'UserId',
    unique:true
  }
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
    User,
    Campagne,
    GalerieCampagne,
    NiveauEtude,
    ApiInstagramHistory,
    Role,
    Offre,
    EtatPaiment,
    InteretCampagne,
    InteretInfluenceur,
    LangueInfluenceur
}
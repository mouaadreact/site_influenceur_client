

module.exports=(Sequelize,dataType)=>{
 
 //-----create table client 
  const Influenceur=Sequelize.define("Influenceur",{
      
      nom:{
       type:dataType.STRING(50),
       allowNull:false
      },
      prenom:{
       type:dataType.STRING(50),
       allowNull:false
      },
      email:{
        type:dataType.STRING(50),
        allowNull:false
       }, 
       username:{
        type:dataType.STRING(50),
        allowNull:false
       },
       password:{
        type:dataType.STRING(50),
        allowNull:false
       } ,
      genre:{
       type:dataType.STRING(10),
       allowNull:false
      },
      dateNaissance:{
       type:dataType.DATE,
       allowNull:false
      },
      instagramUsernameCompte:{
       type:dataType.TEXT,
       allowNull:false
      },
      facebookUsernameCompte:{
       type:dataType.TEXT,
       allowNull:true
      },
      youtubeUsernameCompte:{
       type:dataType.TEXT,
       allowNull:true
      },
      pays:{
       type:dataType.STRING(50),
       allowNull:false
      },
      ville:{
       type:dataType.STRING(50),
       allowNull:false
      },
      quartier:{
       type:dataType.STRING(100),
       allowNull:false
      },
      codePostal:{
       type:dataType.BIGINT,
       allowNull:false
      },
      situationFamilale:{
       type:dataType.STRING(50),
       allowNull:false
      },
      nombreEnfant:{
       type:dataType.INTEGER,
       allowNull:false
      },
      niveauEtude:{
       type:dataType.STRING(50),
       allowNull:false
      },
      profession:{
       type:dataType.STRING(50),
       allowNull:false 
      }, 
      token:{
       type:dataType.TEXT
      },
      commentaire:{
       type:dataType.TEXT
      },
      statusAccepterConditionGenerale:{
       type:dataType.BOOLEAN,
       allowNull:false
      },
      statusEtatActiver:{
       type:dataType.BOOLEAN,
       allowNull:false
      }
 
  });
  
 
  return Influenceur;
}
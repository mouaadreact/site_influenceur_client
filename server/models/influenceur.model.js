

module.exports=(Sequelize,dataType)=>{
 
 //-----create table client 
  const Influenceur=Sequelize.define("Influenceur",{
      
      nom:{
       type:dataType.STRING(50),
      },
      prenom:{
       type:dataType.STRING(50),
      },
      email:{
        type:dataType.STRING(50),
        allowNull:false,
        unique:true,
       }, 
       username:{
        type:dataType.STRING(50),
        allowNull:false,
        unique:true
       },
       password:{
        type:dataType.TEXT,
        allowNull:false,   
       } ,
      genre:{
       type:dataType.STRING(10),
      },
      dateNaissance:{
       type:dataType.DATE,
      },
      instagramUsernameCompte:{
       type:dataType.TEXT,
      },
      facebookUsernameCompte:{
       type:dataType.TEXT,
      },
      youtubeUsernameCompte:{
       type:dataType.TEXT,
      },
      pays:{
       type:dataType.STRING(50),
      },
      ville:{
       type:dataType.STRING(50),
      },
      quartier:{
       type:dataType.STRING(100),
      },
      codePostal:{
       type:dataType.BIGINT,
      },
      situationFamiliale:{
       type:dataType.STRING(50),
      },
      nombreEnfant:{
       type:dataType.INTEGER,
      },
      niveauEtude:{
       type:dataType.STRING(50),
      },
      profession:{
       type:dataType.STRING(50),
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


module.exports=(Sequelize,dataType)=>{
 
 //-----create table client 
  const Influenceur=Sequelize.define("Influenceur",{
      
      nom:{
       type:dataType.STRING(50),
       validate:{
        is:/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/gi,
        min:{
          args:[3],
          msg:"Minimum 3 characters required in nom"
           }
       }
      },
      prenom:{
       type:dataType.STRING(50),
       validate:{
        is:/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/gi,
        min:{
          args:[3],
          msg:"Minimum 3 characters required in prenom"
           }
       }
      },
      email:{
        type:dataType.STRING(50),
        allowNull:false,
        unique:true,
        validate:{
          isEmail: true
          }
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
       validate:{
        customValidator(value){
          if(new Date(value)>= new Date()){
            throw new Error("invalid date")
             }
          }
        }
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
      statusValideInstagramCompte:{
       type:dataType.BOOLEAN,
       default:false,
      },
      statusAccepterConditionGenerale:{
       type:dataType.BOOLEAN,
       default:false,
      },
      statusEtatActiver:{
       type:dataType.BOOLEAN,
       default:true,
      }
 
  });
  
 
  return Influenceur;
}
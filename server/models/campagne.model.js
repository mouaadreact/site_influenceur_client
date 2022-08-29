 

module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Campagne=Sequelize.define("Campagne",{
      
      titre:{
       type:dataType.STRING(100),
       allowNull:false,
       unique:true,
       validate:{
          min:{
              args:[3],
              msg:"Minimum 3 characters required in titre"
          }
       }
      },
      dateDebut:{
       type:dataType.DATE,
       allowNull:false,
       validate:{
        customValidator(value){
          if(new Date(value)<new Date()){
            throw new Error("invalid date")
             }
          }
        }
      },
      dateFin:{
       type:dataType.DATE,
       allowNull:false,
       validate:{
        customValidator(value){
          if(new Date(value)<new Date()){
            throw new Error("invalid date")
             }
          }
        }
      },
      presence:{
       type:dataType.BOOLEAN,
       allowNull:false
      },
      nombreInfluenceur:{
       type:dataType.INTEGER,
       allowNull:false
      }, 
      descriptionOffre:{
       type:dataType.TEXT,
       allowNull:false
      },
      hashtags:{
       type:dataType.TEXT, 
       allowNull:false,
       validate:{
        is:/^(#[a-zA-Z0-9]+,? *)*#[a-zA-Z0-9]+(\s)?$/gi
       }
      },
      compteTagger:{
       type:dataType.TEXT,
       allowNull:false,
       validate:{
        is:/^(@[a-zA-Z0-9]+,? *)*@[a-zA-Z0-9]+(\s)?$/gi
       }
      }


  });
  
 
  return Campagne;
}
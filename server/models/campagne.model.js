 

module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Campagne=Sequelize.define("Campagne",{
      
      titre:{
       type:dataType.STRING(100),
       allowNull:false,
       unique:true
      },
      dateDebut:{
       type:dataType.DATE,
       allowNull:false
      },
      dateFin:{
       type:dataType.DATE,
       allowNull:false
      },
      presence:{
       type:dataType.BOOLEAN,
       allowNull:false
      },
      nombreInfluenceur:{
       type:dataType.INTEGER,
       allowNull:false
      }, 
      DescriptionOffre:{
       type:dataType.TEXT,
       allowNull:false
      },
      hashtags:{
       type:dataType.TEXT,
       allowNull:false,
       validate:{
        is:/(#(?:[^\x00-\x7F]|\w)+)/g // testing 
       }
      },
      compteTagger:{
       type:dataType.TEXT,
       allowNull:false,
       validate:{
        is:/(@(?:[^\x00-\x7F]|\w)+)/g
       }
      }


  });
  
 
  return Campagne;
}
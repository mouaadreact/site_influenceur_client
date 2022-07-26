module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  return Sequelize.define("Client",{
      nomSociete:{
       type:dataType.STRING(100),
       allowNull:false
      },
      pays:{
       type:dataType.STRING(100),
       allowNull:false
      },
      ville:{
       type:dataType.STRING(100),
       allowNull:false
      }, 
      quartier:{
       type:dataType.STRING(100),
       allowNull:false
      },
      codePostal:{
       type:dataType.INTEGER,
       allowNull:false
      },
      nomDirecteur:{
       type:dataType.STRING(100),
       allowNull:false
      },
      telephone:{
       type:dataType.STRING(50),
       allowNull:false
      }, 
      email:{
       type:dataType.STRING,
       allowNull:false
      },
      password:{
       type:dataType.STRING,
       allowNull:false
      }

  });
  

}
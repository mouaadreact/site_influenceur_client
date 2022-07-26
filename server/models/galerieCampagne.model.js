module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const GalerieCampagne=Sequelize.define("GalerieCampagne",{
     
      nomPhoto:{
       type:dataType.STRING,
       allowNull:false
      },
      taillePhoto:{
       type:dataType.INTEGER,
       allowNull:false
      }, 
      typePhoto:{
       type:dataType.STRING(100),
       allowNull:false
      },
      dataPhoto:{
       type:dataType.TEXT, //blob
       allowNull:false
      }
      

  });
  
  
 
 
  
  return GalerieCampagne;
}
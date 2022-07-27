module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const GalerieCampagne=Sequelize.define("GalerieCampagne",{ 
      image:{
        type:dataType.TEXT
      }
  });
  

  
  return GalerieCampagne;
}
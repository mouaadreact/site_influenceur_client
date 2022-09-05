 

module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const ApiInstagramHistory=Sequelize.define("ApiInstagramHistory",{
      
   path:{
    type:dataType.TEXT
   }

  });
  
 
  return ApiInstagramHistory;
}
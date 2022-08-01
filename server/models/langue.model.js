module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Langue=Sequelize.define("Langue",{
      langueNom:{
       type:dataType.TEXT,
       allowNull:false,
       unique:true
      }
  });
    
 
 
 
  
  return Langue;
}
module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Langue=Sequelize.define("Langue",{
      langueNom:{
       type:dataType.STRING(255),
       allowNull:false,
       unique:true
      }
  });
    
 
 
 
  
  return Langue;
}
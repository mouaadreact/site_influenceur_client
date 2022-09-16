module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const NiveauEtude=Sequelize.define("NiveauEtude",{
       niveauEtudeNom:{
       type:dataType.STRING(255),
       allowNull:false,
       unique:true
      }
  });
    
 
 
 
  
  return NiveauEtude;
}
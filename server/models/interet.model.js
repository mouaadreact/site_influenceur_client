module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Interet=Sequelize.define("Interet",{
    interetNom:{
      type:dataType.STRING(255),
      allowNull:false,
      unique:true
     } 
  });
   
  
  return Interet;
}
module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Role=Sequelize.define("Role",{
     
      roleNom:{
       type:dataType.STRING(255),
       allowNull:false,
       unique:true
       
      }
  });
    

  return Role;
}
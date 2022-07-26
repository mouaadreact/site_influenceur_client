module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Manager=Sequelize.define("Manager",{
      email:{
       type:dataType.STRING(50),
       allowNull:false
      }, 
      username:{
       type:dataType.STRING(50),
       allowNull:false
      },
      password:{
       type:dataType.STRING(50),
       allowNull:false
      } 
  });
    

  return Manager;
}
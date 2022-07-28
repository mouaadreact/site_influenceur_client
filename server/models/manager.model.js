module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Manager=Sequelize.define("Manager",{
      email:{
       type:dataType.STRING(50),
       allowNull:false,
       validate:{
        isEmail: true
           }
      }, 
      username:{
       type:dataType.STRING(50),
       allowNull:false
      },
      password:{
       type:dataType.TEXT,
       allowNull:false
      } 
  });
    

  return Manager;
}
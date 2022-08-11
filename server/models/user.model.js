module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const User=Sequelize.define("User",{
      email:{
       type:dataType.STRING(50),
       allowNull:false,
       unique:true,
       validate:{
        isEmail: true
           }
      }, 
      username:{
       type:dataType.STRING(50),
       allowNull:false,
       unique:true
       
      },
      password:{
       type:dataType.TEXT, 
       allowNull:false
      },
      isInfluenceur:{
        type:dataType.BOOLEAN,
        allowNull:true
      }
  });
    

  return User;
}
module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  const Manager=Sequelize.define("Manager",{
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
      } 
  });
    

  return Manager;
}
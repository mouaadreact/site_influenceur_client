module.exports=(Sequelize,dataType)=>{

 //-----create table client 
  return Sequelize.define("Client",{
      nomSociete:{  
       type:dataType.STRING(100),
       allowNull:false,
       validate:{
        min:{
            args:[3],
            msg:"Minimum 3 characters required in nomSociete"
        }
     }
      },
      pays:{
       type:dataType.STRING(100),
       allowNull:false
      },
      ville:{
       type:dataType.STRING(100),
       allowNull:false
      }, 
      quartier:{
       type:dataType.STRING(100),
       allowNull:false
      },
      codePostal:{
       type:dataType.INTEGER,
       allowNull:false
      },
      nomDirecteur:{
       type:dataType.STRING(100),
       allowNull:false,
       validate:{
        is:/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/gi
       }
      },
      telephone:{
       type:dataType.STRING(50),
       allowNull:false,
       unique:true,
       validate:{
        is:/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
       }
      }, 
      email:{
       type:dataType.STRING,
       allowNull:false,
       unique:true,
       validate:{
        isEmail: true
         }
      },
      password:{
       type:dataType.TEXT
      }

  });
  

}
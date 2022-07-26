 
 module.exports=(Sequelize,dataType)=>{
 
  //-----create table client 
   const TemporaireInfluenceur=Sequelize.define("TemporaireInfluenceur",{
       email:{
        type:dataType.STRING(50),
        allowNull:false,
        unique:true
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
       token:{
        type:dataType.TEXT,
       },
       statusConfirmer:{
        type:dataType.BOOLEAN,
        allowNull:false
       }
   });
   
    
  //------association:
       //sans association
  
   
   return TemporaireInfluenceur;
 }
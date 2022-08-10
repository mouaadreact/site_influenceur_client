
const {Influenceur,User,Role}=require("../models");
const SchemaValidation=require("../validators/influenceur.validator")
const UsernameByEmail=require("../utils/usernameByEmail");
const compareCryptPassword=require("../utils/compareCryptPassword");
const SendEmail=require("../utils/SendEmailValidationCompte");
const bcrypt=require("bcrypt");
//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//login  :  
exports.login= async (req,res)=>{
   const {email}=req.body;
   try{
   const data=await User.findOne({
      where:{
         email
        },
        include:[Role]
   });

   if(!data){
      res.status(400).json({err:{
         email:"email not correct"
      }});
   }else{
      
      let token= await compareCryptPassword.verifier(req.body.password,data.password,data.id,data.email,data.Role.dataValues.roleNom);
     // console.log(token);
      if(token!=null){
      
         res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
         res.status(200).json({
            token:token,
            role:data.Role.dataValues.roleNom
         });
        }else{
         res.status(400).json({
          err:{
          password:"password n'est pas validé!"
             }
           }
         );
      }  

   }
   
   }catch(err){
    res.status(400).json(err);
   }


}

//-------------------------------------------------------------------
//logout :
exports.logout = (req,res) =>{
 res.cookie('jwt','',{maxAge :1}); // res obliger dans cette router
 res.status(200).json({msg:'logout'})
}

//----------------------------------------------------------

//register un(e) influenceur etape 1:
exports.registerInfluenceur=async(req,res)=>{

 const {email,password,username}=req.body;
 let validation=SchemaValidation.validate({email,password})

 if(validation.error){
   res.json({validation:validation.error.details[0].message})
  }
  
 User.count({
  where:{
   email,
   statusConfirmeInfluenceur:false
        }
 })
 .then(doc=>{ 
   //console.log(doc);
  if(doc!=0){
   res.status(400).json({error:"Influenceur deja exist ! "});
  }else{
   // console.log("yes");
    bcrypt.hash(password,10).then(passwordCrypt=>{
    User.create({
     email:req.body.email,
     username:req.body.username,
     password:passwordCrypt,
     statusConfirmeInfluenceur:false,
     RoleId:2
     })
     .then((result)=>{
      res.status(200).json(result);
      SendEmail.ContactUs(req.body.email,`comfirmer votre email`,`Click in : http://localhost:3000/register/confirmEmail?id=${result.id}&email=${req.body.email}`)
   
   })
     .catch((err)=>res.status(400).json(err))

     //send email pour verifier 

   })
  }
 })

}


//-----------------------------
//add admin account
exports.registerAdmin=async(req,res)=>{

   const {email,password,username}=req.body;
   let validation=SchemaValidation.validate({email,password})
  
   if(validation.error){
     res.json({validation:validation.error.details[0].message})
    }
    
   User.count({
      where:{email:email}
   })
   .then(doc=>{ 
    if(doc!=0){
     res.status(400).json({error:"user deja exist ! "})
    }else{
  
      bcrypt.hash(password,10).then(passwordCrypt=>{

      User.create({
       email:req.body.email,
       username:username,
       password:passwordCrypt,
       RoleId:1
      })
       .then((result)=>res.status(200).json({
         result,
         admin:true
       }))
       .catch((err)=>res.status(400).json(err))
       
  
     })
    }
   })
  
  }
  
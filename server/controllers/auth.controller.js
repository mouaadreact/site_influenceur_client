
const {Influenceur,User,Role}=require("../models");
const SchemaValidation=require("../validators/influenceur.validator")
const UsernameByEmail=require("../utils/usernameByEmail");
const compareCryptPassword=require("../utils/compareCryptPassword");
const SendEmail=require("../utils/SendEmailValidationCompte");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION; 
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
      
       

         if(data.isInfluenceur!=true){
            if(data.Role.dataValues.roleNom=="admin"){
               res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
               res.status(200).json({
                  status:"login",
                  token:token,
                  role:data.Role.dataValues.roleNom
               });
            }else{
               //res.redirect('http://localhost:3000/register/verifierEmail');
               res.status(200).json({
                  status:"confirmEmail",
                  message:"error tu n'est pas confirmer votre Email ! ",
                  id:data.UserId
               })
            }
         }else{
            try{
               let influenceurData=await Influenceur.findOne({
                 where:{UserId:data.id}
               });
               if(!influenceurData){
                  res.status(400).json({
                     status:"error",
                     message:"error cant find influenceur"
                  })
               }else{
                  influenceurData=influenceurData.dataValues;
                  if(influenceurData.statusValideInstagramCompte==false){
                     res.status(200).json({
                        status:"validCompte",
                        message:"redirect to valid compte instagram",
                        id:influenceurData.id
                     });
                  }else{
                     if(influenceurData.statusIsComplete==false){
                        res.status(200).json({
                           status:"completeProfil",
                           message:"redirect to complete profil",
                           id:influenceurData.id
                        });
                     }else{
                           if(influenceurData.statusAccepterConditionGenerale==false){
                              res.status(200).json({
                                 status:"conditionGenrale",
                                 message:"redirect to confirm condition generale",
                                 id:influenceurData.id
                              });
                           }
                           else{
                              
                              if(influenceurData.statusEtatActiver==false){
                                 res.status(200).json({
                                    status:"ActiveCompte",
                                    message:"compte not active",
                                    id:influenceurData.id
                                 }); 
                              }else{
                                    res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
                                    res.status(200).json({
                                       status:"login",
                                       token:token,
                                       role:data.Role.dataValues.roleNom
                                    }); 
                              }
                           }
                     }
                  }
               }
            }catch(err){
               res.status(400).json(err)
            }
         }

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
  
 /*User.count({
  where:{
   email,
   isInfluenceur:false
        }
 })
 .then(doc=>{ 
   //console.log(doc);
  if(doc!=0){
   res.status(400).json({error:"Influenceur deja exist ! "});
  }else{*/
   // console.log("yes");
    bcrypt.hash(password,10).then(passwordCrypt=>{
    User.create({
     email:req.body.email,
     username:req.body.username,
     password:passwordCrypt,
     isInfluenceur:false,
     RoleId:2 //influenceur
     })
     .then((result)=>{
  
         res.status(200).json({
            status:"register",
            message:"confirme your email",
            result:result
         });

         jwt.sign({id:result.id,email:result.email,role:"influenceur"},privateKey,{
            expiresIn:3*24*60*60*1000 },(err,token)=>{
           console.log(`http://localhost:5000/api/v1/influenceur/confirmer-email?token=${token}`);
            SendEmail.ContactUs(req.body.email,`comfirmer votre email`,`Click in : http://localhost:3000/register/confirmEmail?token=${token}`);
              });
   
   })
     .catch((err)=>res.status(400).json(err))


   })
  /*}
 })
*/
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
       username:username, //isInfluenceur : null
       password:passwordCrypt,
       isInfluenceur:null,
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
  
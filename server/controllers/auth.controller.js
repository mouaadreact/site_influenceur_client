
const {Influenceur,TemporaireInfluenceur,Manager}=require("../models");
const SchemaValidation=require("../validators/influenceur.validator")
const UsernameByEmail=require("../utils/usernameByEmail");
const compareCryptPassword=require("../utils/compareCryptPassword");
const SendEmail=require("../utils/SendEmailValidationCompte");
const bcrypt=require("bcrypt");
//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//login  :  

exports.login=async (req,res)=>{
  
  const AdminCount=await Manager.count({
    where:{
     email:req.body.email
    }
  });
  if(AdminCount>0){
     //admin login*
     try{ 
      var data=await Manager.findOne({
                        where:{email:req.body.email}
                        }); 
      data=data.dataValues;
    
      if(!data){
       res.status(400).json(
         {
            error:{
                  email:"email not valid!"
               }
         });
      }
      else{
           console.log("manager : ");
           let token= await compareCryptPassword.verifier(req.body.password,data.password,data.id,data.email,"admin");
           console.log(token);
           if(token!=null){
           
              res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
              res.status(200).json({
                 token:token,
                 admin:true
              });
             }else{
              res.status(400).json({
               error:{
               password:"password n'est pas validé!"
                  }
                }
              );
           }               
      }
        
     }catch(err){
        res.status(400).json({err:err});
     }
  }else{

   try{
    //influenceur login*
    var countTempInf=await TemporaireInfluenceur.count({
                         where:{
                           email:req.body.email
                           }
                         });
  
  
     if(countTempInf>0){  
       //si on reste dans etape1 
           
           var data=await TemporaireInfluenceur.findOne({
                          where:{email:req.body.email}
                          }); 
           data=data.dataValues;
  
         
  
           if(!data){
           res.json({error:"email not valid!"});
  
           }
           else{  
            console.log("temporaireInfluenceur : ");
             const token= await compareCryptPassword.verifier(req.body.password,data.password,data.id,data.email,"influenceur");
             if(token!=null){
                
                res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
                res.status(200).json({
                   token:token,
                   admin:false
                });
               }else{
                res.status(400).json({err:"password n'est pas validé ! "});
             }         
  
           }
  
     }else{
       //si on passe vers etape 2
           
           var data=await Influenceur.findOne({
                         where:{email:req.body.email}
                         }); 
           data=data.dataValues;
  
  
           if(!data){
           res.json({error:"email not valid!"});
  
           }
           else{
            console.log("influenceur : ");
            let token= await compareCryptPassword.verifier(req.body.password,data.password,data.id,data.email,"influenceur");
            if(token!=null){
               res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
               res.status(200).json({
                  token:token,
                  admin:false
               });
              }else{
               res.status(400).json({err:"password n'est pas validé ! "});
            }   

           }
  
  
  
       }
     
   }catch(err){
      res.status(400).json({err:err}); 
   }  
  }

}

//-------------------------------------------------------------------
//logout :
exports.logout = (req,res) =>{
 res.cookie('jwt','',{maxAge :1});
 res.redirect('/');
}

//----------------------------------------------------------

//register un(e) influenceur etape 1:
exports.register=async(req,res)=>{

 const {email,password}=req.body;
 let validation=SchemaValidation.validate({email,password})

 if(validation.error){
   res.json({validation:validation.error.details[0].message})
  }
  
 TemporaireInfluenceur.count({
  where:{email:email}
 })
 .then(doc=>{ 
  if(doc!=0){
   res.status(400).json({error:"username or password invalid"})
  }else{

    bcrypt.hash(password,10).then(passwordCrypt=>{
    TemporaireInfluenceur.create({
     email:req.body.email,
     username:UsernameByEmail(req.body.email),
     password:passwordCrypt})
     .then((result)=>res.status(200).json(result))
     .catch((err)=>res.status(400).json(err))
     //send email pour verifier 
     SendEmail.ContactUs(req.body.email,`comfirmer votre email`,`Click in : http://localhost:3000/api/v1/influenceur/confirmer-email?email=${req.body.email}`)

   })
  }
 })

}

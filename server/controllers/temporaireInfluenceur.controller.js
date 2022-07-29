
const {TemporaireInfluenceur}=require("../models");
const UsernameByEmail=require("../utils/usernameByEmail");
const SchemaValidation=require("../validators/temporaireInfluenceur.validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION;
const SendEmail=require("../utils/SendEmailValidationCompte");
//-------------------------------------------------------------
//logout une influenceur;

//register un(e) influenceur
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
         password:passwordCrypt,
         statusConfirmer:false})
         .then((result)=>res.status(200).json(result))
         .catch((err)=>res.status(400).json(err))
         //send email pour verifier 
         SendEmail.ContactUs(req.body.email,`http://localhost:3000/api/v1/influenceur/confirmer-email?email=${req.body.email}`)

       })
      }
     })

    }

    //login:
    //commentaire cette method car j'utilise pour le testing
/*
exports.Login=async (req,res)=>{
 
 try{
  var data=await TemporaireInfluenceur.findOne({
                    where:{email:req.body.email}
                    }); 
  data=data.dataValues;

  if(!data){
   res.json({error:"email not valid!"});
  
  }
  else{
     
     bcrypt.compare(req.body.password,data.password).then((same)=>{
       if(same){
        let token=jwt.sign({id:data.id,email:req.body.email,role:"userRole"},privateKey,{
         expiresIn:3*24*60*60*1000 });
         res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
         res.status(200).json({token:token})

       }else{
        res.status(400).json({err:"password not valid"});
       }
     })
  }
    
 }catch(err){
    res.status(400).json({err:err});
 }
}*/

//---------------------------------------------------
//logout influenceur:
exports.Logout = (req,res) =>{
  res.cookie('jwt','',{maxAge :1});
  res.redirect('/');
}
 //----------------------------------------------------
 
//afficher tout les influenceurs dans table temporaire
exports.getAll=async (req,res)=>{
  try{
   const data=await TemporaireInfluenceur.findAll()
   if(!data){
    res.status(400).json({error:"les influenceurTemporaires sont introuvables!"});
   }else{
    res.status(200).json(data);
   }
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//afficher une seul influenceurTemporaire by id
exports.getId=async (req,res)=>{
 
  try{
   const data=await TemporaireInfluenceur.findOne({
                     where:{id:req.params.id}
                     });
       
    if(!data){
      res.status(400).json({error:"l'influenceurTemporaire est introuvable!"});
    }else{
      res.status(200).json(data);
    }

  }catch(err){
   res.status(400).json(err);
  }
}

//editer influenceurTemporaire
exports.Update=async (req,res)=>{

 try{
  const data=await  TemporaireInfluenceur.update({
                    email:req.body.email, 
                    username:req.body.username,
                    password:req.body.password,
                    statusConfirmer:req.body.statusConfirmer 
                    },{
                     where:{id:req.params.id}
                    })
      
    if(!data){
    res.status(400).json({error:"on peut pas editer l'influenceurTemporaire!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}


//delete influenceurs dans table temporaire
exports.Delete= async (req,res)=>{
  
 try{
  const data=await  TemporaireInfluenceur.destroy({
                     where:{id:req.params.id}
                      })
      
    if(!data){
    res.status(400).json({error:"on peut pas supprimer influenceurTemporaire!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
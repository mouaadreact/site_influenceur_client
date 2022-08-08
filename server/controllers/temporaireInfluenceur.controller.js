
const {TemporaireInfluenceur}=require("../models");
const UsernameByEmail=require("../utils/usernameByEmail");
const SchemaValidation=require("../validators/temporaireInfluenceur.validator");
const SendEmail=require("../utils/SendEmailValidationCompte");
//-------------------------------------------------------------

 
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
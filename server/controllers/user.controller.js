
const {User, Role, Influenceur}=require("../models");
const SchemaValidation=require("../validators/manager.validator");
const bcrypt=require("bcrypt");


//-------------------------------------------------------------
 //Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"


    
 //-----------------------------------------
//afficher tout les users

exports.getAll=async (req,res)=>{
  try{
    
   const data=await User.findAll({include:[Role,Influenceur]});
    if(!data){
      res.status(400).json({error:"les users sont introuvables !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json({err:err});
  }
  
}


//afficher une spec user
exports.getId=async (req,res)=>{
 
  try{
   const data=await User.findOne({
                     where:{id:req.params.id},
                     include:[Role]
                     });
       
    if(!data){
      res.status(400).json({error:"l'user est introuvable !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//getEmail:
//afficher une spec user
exports.getEmail=async (req,res)=>{
 
  try{
   const data=await User.findOne({
                     where:{email:req.query.email},
                     include:[Role]
                     });
       
    if(!data){
      res.status(400).json({error:"l'user est introuvable !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//editer un user
exports.update=async (req,res)=>{

 try{
  const data=await  User.update({
                    email:req.body.email, 
                    username:req.body.username,
                    password:req.body.password, 
                    },{
                     where:{id:req.params.id}
                    })
      
    if(!data){
    res.status(400).json({message:"on peut pas editer user!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}

 
//delete user(influenceur dans table temporaire delete??)
exports.delete= async (req,res)=>{
 
 try{
  const data=await  User.destroy({
                     where:{id:req.params.id}
                      })
      
    if(!data){
    res.status(400).json({message:" on peut pas supprimer user!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json({err:err});
 }
}

//---------------------
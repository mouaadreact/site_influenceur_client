const {Role}=require("../models");
//-------------------------------------------
 //Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"


//ajouter les roles :
exports.addRole=async (req,res)=>{
  try{
   const {roleNom}=req.body;
   const data=await Role.create({
                    roleNom
                    });
       
    if(!data){
      res.status(400).json({error:"On peut pas créer Role !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
//afficher tout les Roles
exports.getAll=async (req,res)=>{
 try{

  const data=await Role.findAll();
      
    if(!data){
    res.status(400).json({error:" les Roles sont introuvables !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//affiche une sepecifique Role 
exports.getId=async (req,res)=>{
 try{
  const data=await Role.findOne({
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"la Role est introuvable !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
//editer les Roles:
exports.update=async (req,res)=>{
 try{
  const data=await Role.update(
   {
    RoleNom:req.body.roleNom
   },{
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"On peut pas Editer la Role!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//-----------------------------------------------
//supprimer les Roles
exports.delete=async (req,res)=>{
 try{
  const data=await Role.destroy({
   where:{id:req.params.id}
  });
      
      if(!data){
      res.status(400).json({error:"On peut pas Supprimer la Role!"});
      }else{
      res.status(200).json(data);
      }
 }catch(err){
  res.status(400).json(err);
 }
}
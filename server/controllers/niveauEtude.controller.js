const { NiveauEtude } = require("../models");
//-------------------------------------------
 //Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter les niveaux etudes :
exports.addNiveauEtude=async (req,res)=>{
  try{
   const {niveauEtudeNom}=req.body;
   const data=await NiveauEtude.create({
                    niveauEtudeNom
                    });
       
    if(!data){
      res.status(400).json({error:"On peut pas créer Niveau étude !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
//afficher tout les Niveaux etudes
exports.getAll=async (req,res)=>{
 try{

  const data=await NiveauEtude.findAll();
      
    if(!data){
    res.status(400).json({error:" les Niveaux etudes sont introuvables !"});
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
  const data=await NiveauEtude.findOne({
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"la niveau étude est introuvable !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
//editer les niveaux etudes:
exports.update=async (req,res)=>{
 try{
  const {niveauEtudeNom}=req.body;
  const data=await NiveauEtude.update(
   {
    niveauEtudeNom
   },{
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"On peut pas Editer niveau etude!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//-----------------------------------------------
//supprimer les niveaux etudes
exports.delete=async (req,res)=>{
 try{
  const data=await NiveauEtude.destroy({
   where:{id:req.params.id}
  });
      
      if(!data){
      res.status(400).json({error:"On peut pas Supprimer niveau etude ! "});
      }else{
      res.status(200).json(data);
      }
 }catch(err){
  res.status(400).json(err);
 }
}
const {Interet}=require("../models");
//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"


//Ajouter l'interet:
exports.addInteret=async (req,res)=>{
  try{
   const {interetNom}=req.body;
   const data=await Interet.create({
      interetNom:interetNom
   })
       
    if(!data){
      res.status(400).json({error:"On peut pas créer l'interet!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
//afficher tout les interets
exports.getAll=async (req,res)=>{
 try{

  const data=await Interet.findAll();
      
    if(!data){
    res.status(400).json({error:"les interets sont introuvables !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//afficher un interet BY id
exports.getId=async (req,res)=>{
 try{
  const data=await Interet.findOne({
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"l'interet est introuvable!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
//editer l'interet
exports.update=async (req,res)=>{
 try{
  const data=await Interet.update(
   {
    interetNom:req.body.interetNom
   },{
   where:{id:req.params.id}
  });
      
    if(!data){ 
    res.status(400).json({error:"On peut pas editer l'interet !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//-----------------------------------------------
//supprimer l'interet
exports.delete=async (req,res)=>{
 try{
  const data=await Interet.destroy({
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"On peut pas supprimer l'interet !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
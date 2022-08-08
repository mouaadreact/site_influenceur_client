const {Offre}=require("../models");
//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter Offre:
exports.addOffre=async (req,res)=>{
   

  try{
   const data=await Offre.create({
                          CampagneId:req.params.campagneId,
                          InfluenceurId:req.params.influenceurId,
                          statusAccepter:false,
                          statusNouveau:true
                                })
       
    if(!data){
      res.status(400).json({message:"On peut pas créer  offre!"});
    }else{
      res.status(200).json(data);
    }

  }catch(err){
   res.status(400).json(err);
  }
}

//----------------------------------------------
// afficher tout les offres
exports.getAll=async (req,res)=>{
 try{

  const data=await Offre.findAll();
      
    if(!data){
    res.status(400).json({error:"les Offres sont introuvables!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//afficher l'offre by id
exports.getId=async (req,res)=>{
 try{
  const data=await Offre.findOne({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
    if(!data){
    res.status(400).json({error:"trouve l'Offre!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
//no means i change this after 
exports.update=async (req,res)=>{
 try{
  const data=await Offre.update(
   {
    statusAccepter:req.body.statusAccepter,
    statusNouveau:req.body.statusNouveau
   },{
    where:{
     CampagneId:req.params.campagneId,
     InfluenceurId:req.params.influenceurId
    }
  });
      
    if(!data){ 
    res.status(400).json({error:"on peut pas editer offre!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json(err);
 }
}

//---------------------------------------------
//change new to old offre:

exports.oldOffre=async (req,res)=>{
 try{
  const data=await Offre.update(
   {
    statusNouveau:false
   },{
    where:{
     CampagneId:req.params.campagneId,
     InfluenceurId:req.params.influenceurId
    }
  });
      
    if(!data){ 
    res.status(400).json({error:"on peut pas change status offre tout old!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}

//-----------------------------------------------
//accepter offre:
exports.accepterOffre=async (req,res)=>{
 try{
  const data=await Offre.update(
   {
    statusAccepter:true
   },{
    where:{
     CampagneId:req.params.campagneId,
     InfluenceurId:req.params.influenceurId
    }
  });
      
    if(!data){ 
    res.status(400).json({error:"On peut pas accepter l'offre!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}
//-----------------------------------------------
//refuser offre:

exports.refuserOffre=async (req,res)=>{
  try{
   const data=await Offre.update(
    {
     statusNouveau:false
    },{
     where:{
      CampagneId:req.params.campagneId,
      InfluenceurId:req.params.influenceurId
     }
   });
       
     if(!data){ 
     res.status(400).json({error:"On peut pas refuser l'offre!"});
     }else{
     res.status(200).json(data);
     }
 
  }catch(err){
   res.status(400).json(err);
  }
 }
 

//-----------------------------------------------
//supprimer offre
exports.delete=async (req,res)=>{
 try{
  const data=await Offre.destroy({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
    if(!data){
    res.status(400).json({error:"on peut pas supprimer offre!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json(err);
 }
}
const {Offre}=require("../models");
const Op = require('Sequelize').Op
const sequelize=require('Sequelize');
//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter Offre:
exports.addOffre=async (req,res)=>{
   

  try{
   const data=await Offre.create({
                          CampagneId:req.params.campagneId,
                          InfluenceurId:req.params.influenceurId,
                          status:"En cours traitement"
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

//!---------------------------------------------------------

//afficher l'offre by id
exports.getCampagneId=async (req,res)=>{
  try{
   const data=await Offre.findAll({
    where:{
      InfluenceurId:req.params.influenceurId
     }
   });
       
     if(!data){
     res.status(400).json({error:"trouve l'Offre using campagne Id!"});
     }else{
     res.status(200).json(data);
     }
 
  }catch(err){
   res.status(400).json(err);
  }
 }

 //!----------------------------------------------------------

 
//afficher l'offre by id
exports.getOffreAccepterByInfluenceurId=async (req,res)=>{
  try{
   const data=await Offre.findAll({
    where:{
      [Op.and]:[
       {InfluenceurId:req.params.influenceurId},
       { status:"Accepter"},       
      ]

      }
   });
       
     if(!data){
     res.status(400).json({error:"trouve l'Offre accepter using Influenceur Id!"});
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
    status:req.body.status,
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

exports.newOffre=async (req,res)=>{
 try{
  const data=await Offre.findAll({
    where:{
     [Op.and]:[
      {InfluenceurId:req.params.influenceurId},
      {
        [Op.and]:[
         
           { status:{ [Op.ne]:"Accepter"}},
           { status:{ [Op.ne]:"Refuser"}}
          
        ]
      }
      
    ]
     }
    }
  )

 // const data=await sequelize.query('select * from offres')
      
    if(!data){ 
    res.status(400).json({error:"Not found new Offre!"});
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
    status:"Accepter"
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
     status:"Refuser"
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
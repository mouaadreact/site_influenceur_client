const {Offre}=require("../models");
//-------------------------------------------

//add Offre:
exports.addOffre=async (req,res)=>{

  try{
   const data=await Offre.create({
                          CampagneId:req.params.campagneId,
                          InfluenceurId:req.params.influenceurId,
                          statusAccepter:false,
                          statusNouveau:true
                                })
       
   if(!data){
    res.json({message:"can't create offre!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
exports.getAll=async (req,res)=>{
 try{

  const data=await Offre.findAll();
      
  if(!data){
   res.json({message:"Offre introuvable!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------

exports.getId=async (req,res)=>{
 try{
  const data=await Offre.findOne({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
  if(!data){
   res.json({message:"can't find Offre!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:"error offre !!!"});
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
   res.json({message:"can't update!"});
  }
   res.status(200).json(data);
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
   res.json({message:"can't update!"});
  }
   res.status(200).json(data);
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
   res.json({message:"can't update!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}


//-----------------------------------------------
exports.delete=async (req,res)=>{
 try{
  const data=await Offre.destroy({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
  if(!data){
   res.json({message:"can't delete!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}
const {Interet}=require("../models");
//-------------------------------------------
//add interet:
exports.addInteret=async (req,res)=>{
  try{
   console.log(req.body);
   const {interetNom}=req.body;
   const data=await Interet.create({
      interetNom:interetNom
   })
       
   if(!data){
    res.json({message:"can't create interet!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
exports.getAll=async (req,res)=>{
 try{

  const data=await Interet.findAll();
      
  if(!data){
   res.json({message:"interet introuvable!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------

exports.getId=async (req,res)=>{
 try{
  const data=await Interet.findOne({
   where:{id:req.params.id}
  });
      
  if(!data){
   res.json({message:"can't create interet!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
exports.update=async (req,res)=>{
 try{
  const data=await Interet.update(
   {
    interetNom:req.body.interetNom
   },{
   where:{id:req.params.id}
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
  const data=await Interet.destroy({
   where:{id:req.params.id}
  });
      
  if(!data){
   res.json({message:"can't delete!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}
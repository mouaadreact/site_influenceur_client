const {Langue}=require("../models");
//-------------------------------------------
//add interet:
exports.addLangue=async (req,res)=>{
  try{
   console.log(req.body);
   const {langueNom}=req.body;
   const data=await Langue.create({
      langueNom:langueNom
   })
       
   if(!data){
    res.json({message:"can't create !"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
exports.getAll=async (req,res)=>{
 try{

  const data=await Langue.findAll();
      
  if(!data){
   res.json({message:" introuvable!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------

exports.getId=async (req,res)=>{
 try{
  const data=await Langue.findOne({
   where:{id:req.params.id}
  });
      
  if(!data){
   res.json({message:"introuvable!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
exports.update=async (req,res)=>{
 try{
  const data=await Langue.update(
   {
    langueNom:req.body.langueNom
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
  const data=await Langue.destroy({
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
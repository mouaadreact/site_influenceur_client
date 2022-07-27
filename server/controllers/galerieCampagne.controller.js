const {GalerieCampagne}=require("../models");

//-------------------------------------------

exports.upload=async (req,res)=>{
 try{
  console.log(req.body.campagneId);
  const data=await GalerieCampagne.create({
    image:`${process.env.URL_SERVER}:${process.env.PORT}/api/v1/profile/${req.body.campagneId}/${req.file.filename}`,
    CampagneId:req.body.campagneid
  })

  if(!data){
    res.status(400).json({err:"error in upload image"})
  }
    res.status(200).json({
     access:'1',
     'path':data.dataValues.image
    })
 }catch(err){
  res.status(400).json({error:err})
 }

}

//-------------------------------------------------------


exports.getAll=async (req,res)=>{
 try{
  const data=await GalerieCampagne.findAll()

  if(!data){
    res.status(400).json({err:"error in get all "})
  }
    res.status(200).json(data);
 }catch(err){
  res.status(400).json({error:err})
 }

}

exports.getId=async (req,res)=>{
 console.log(req.params.campagneId)
 try{
  const data=await GalerieCampagne.findAll({
   where:{CampagneId:req.params.campagneId}
  })

  if(!data){
    res.status(400).json({err:"error in get Id "})
  }
    res.status(200).json(data);
 }catch(err){
  res.status(400).json({error:err})
 }

}
const { ApiInstagramHistory } = require("../models");


exports.getAll=async (req,res)=>{
 try{

  const data=await ApiInstagramHistory.findAll();
      
    if(!data){
    res.status(400).json({error:"error findAll apiInstagramHistory!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//trouve tout Campagne d'un interet
exports.getIdInfluenceur=async (req,res)=>{
 try{

  //SELECT * FROM Table ORDER BY ID DESC LIMIT 1
  const data=await ApiInstagramHistory.findOne({
   where:{
    InfluenceurId:req.params.influenceurId
   },
   order: [ [ 'id', 'DESC' ]]
  });
      
    if(!data){
    res.status(400).json({error:"On peut pas trouve Instgram Api d'un influenceur!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
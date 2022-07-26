const {TemporaireInfluenceur}=require("../models");
const UsernameByEmail=require("../utils/usernameByEmail");

//add un(e) influenceur
exports.addInfluenceurTemp=async(req,res)=>{
  try{
   const data=await TemporaireInfluenceur.create({
    email:req.body.email, 
    username:UsernameByEmail(req.body.email),
    password:req.body.password,
    statusConfirmer:req.body.statusConfirmer});
   if(!data){
    res.json({message:"No Data!"});
   }
   res.status(200).json({data:data});

 }catch(err){
  res.status(200).json({err:err});
 }
}


//afficher tout les influenceurs dans table temporaire
exports.getAll=(req,res)=>{
 TemporaireInfluenceur.findAll()
 .then((resultat)=>res.status(200).json(resultat))
 .catch((err)=>res.status(400).json({error:err.errors[0].message}));
}


//get by specific id
exports.getId=(req,res)=>{
 TemporaireInfluenceur.findOne({
  where:{id:req.params.id}
 })
 .then((resultat)=>res.status(200).json(resultat))
 .catch((err)=>res.status(400).json({error:err.errors[0].message}));
}

//update influenceur
exports.Update=(req,res)=>{
 
 TemporaireInfluenceur.update({
  email:req.body.email, 
  username:req.body.username,
  password:req.body.password,
  statusConfirmer:req.body.statusConfirmer 
 },{
  where:{id:req.params.id}
 })
 .then((resultat)=>res.status(200).json(resultat))
 .catch((err)=>res.status(400).json({error:err.errors[0].message}));
}


//delete influenceurs dans table temporaire
exports.Delete=(req,res)=>{
 TemporaireInfluenceur.destroy({
  where:{id:req.params.id}
 })
 .then((resultat)=>res.status(200).json(resultat))
 .catch((err)=>res.status(400).json({error:err.errors[0].message}));
}
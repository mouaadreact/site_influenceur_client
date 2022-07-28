const {Langue}=require("../models");
//-------------------------------------------
 //Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"


//ajouter les langues :
exports.addLangue=async (req,res)=>{
  try{
   const {langueNom}=req.body;
   const data=await Langue.create({
      langueNom:langueNom
   })
       
    if(!data){
      res.status(400).json({error:"On peut pas créer Langue !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//-----------------------------------------------
//afficher tout les langues
exports.getAll=async (req,res)=>{
 try{

  const data=await Langue.findAll();
      
    if(!data){
    res.status(400).json({error:" les langues sont introuvables !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//affiche une sepecifique langue 
exports.getId=async (req,res)=>{
 try{
  const data=await Langue.findOne({
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"la langue est introuvable !"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}
//--------------------------------------------------------------
//editer les langues:
exports.update=async (req,res)=>{
 try{
  const data=await Langue.update(
   {
    langueNom:req.body.langueNom
   },{
   where:{id:req.params.id}
  });
      
    if(!data){
    res.status(400).json({error:"On peut pas Editer la langue!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}

//-----------------------------------------------
//supprimer les langues
exports.delete=async (req,res)=>{
 try{
  const data=await Langue.destroy({
   where:{id:req.params.id}
  });
      
      if(!data){
      res.status(400).json({error:"On peut pas Supprimer la langue!"});
      }else{
      res.status(200).json(data);
      }
 }catch(err){
  res.status(400).json(err);
 }
}
const {GalerieCampagne,Campagne}=require("../models");


//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//upload les images de campagne dans table GalerieCampagne
exports.upload=async (req,res)=>{
 try{
  const data=await GalerieCampagne.create({
  //enregistrer URL d'image exist dans fichier upload->galerieCampagne
    image:`${process.env.URL_SERVER}:${process.env.PORT}/api/v1/profile/${req.body.campagneId}/${req.file.filename}`,
    //utilisant CampagneId pour specifier les images de chaque Campagne
    CampagneId:req.body.campagneId
  })

    if(!data){
      res.status(400).json({error:"Problem dans l'upload d'image ! "});
    }
    else{
      res.status(200).json({
      access:'1',
      'path':data.dataValues.image
      })
    }
 }catch(err){
  res.status(400).json({error:err})
 }

}

//-------------------------------------------------------

//afficher tout les images de tout les campagnes
exports.getAll=async (req,res)=>{
 try{

  const data=await GalerieCampagne.findAll({
    include:[Campagne]
  });

    if(!data){
      res.status(400).json({error:"On peut pas afficher les images de Campagnes "})
    }else{
      res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json({error:err})
 }

}

//afficher des spécifiques images d'une tel Campagne
exports.getId=async (req,res)=>{
 try{
  const data=await GalerieCampagne.findAll({
   where:{CampagneId:req.params.campagneId},
   include:[Campagne]
  })

    if(!data){
      res.status(400).json({error:"On peut afficher les image de cette campagne"})
    }else{
      res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json({error:err})
 }

}
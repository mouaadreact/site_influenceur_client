const {GalerieCampagne,Campagne}=require("../models");


//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"
 
//upload les images de campagne dans table GalerieCampagne
exports.upload=async (req,res)=>{

  
  
  try{
  let GalerieValue=[];
  req.files.forEach((ele)=>{
    GalerieValue.push({
      CampagneId:req.body.CampagneId,
      //enregistrer URL d'image exist dans fichier upload->galerieCampagne
      image:`${process.env.URL_SERVER}:${process.env.PORT}/api/v1/galerieCampagne/${req.body.CampagneId}/${ele.filename}`
    })
  })


    const data=await GalerieCampagne.bulkCreate(GalerieValue);

  
    if(!data){
      res.status(400).json({error:"Problem dans l'upload d'image ! "});
    }
    else{
      res.status(200).json({
      access:'1',
      'data':data
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

exports.deleteGalerieCampagne=async (req,res)=>{
  try{
    const {url}=req.query; 
    
    const data=await GalerieCampagne.destroy({
      where:{
        CampagneId:req.params.campagneId,
        image:url
      }
     })
     //fs.rmdirSync('...',{recursive:true})
   
       if(!data){
         res.status(400).json({error:"On peut supprimer l'image de cette campagne"})
       }else{
         res.status(200).json(data);
       }
  }catch(err){

  }
}
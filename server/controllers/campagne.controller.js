const {Campagne, Client, InteretCampagne, Interet}=require("../models");

//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter une Campagne
exports.addCampagne=async(req,res)=>{
   try{
    const {
     titre,
     dateDebut,
     dateFin,
     presence,
     nombreInfluenceur, 
     descriptionOffre,
     hashtags,
     compteTagger,
     ClientId,
    }=req.body; 
    
   const data=await Campagne.create({
                                titre,
                                dateDebut,
                                dateFin,
                                presence,
                                nombreInfluenceur, 
                                descriptionOffre,
                                hashtags,
                                compteTagger,
                                ClientId
                                  })

      if(!data){
      res.status(400).json({error:"On peut pas créer une campagne!"});
      }else{
      res.status(200).json(data);

 
      }
   }catch(err){  //testing error validators
    res.status(400).json({
      error:err
    }); //using 
   }
}

 //----------------------------------------------------
 
//afficher tout les Campagnes
exports.getAll=async (req,res)=>{
  try{
   const data=await Campagne.findAll({
    attributes:[
      "id",
      "titre",
      "dateDebut",
      "dateFin",
      "presence",
      "nombreInfluenceur",
      "descriptionOffre",
      "hashtags",
      "compteTagger",
      "ClientId"   
    ],
    include:[Client,Interet]
   })
    if(!data){
      res.status(400).json({error:"les campagnes sont introuvables!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json({err:err});
  }
  
}

//--------------------------------------------------
//afficher une seul campagne utilisant id
exports.getId=async (req,res)=>{
 
  try{ 
   const data=await Campagne.findOne({
                     where:{id:req.params.id},
                     attributes:[
                      "id",
                      "titre",
                      "dateDebut",
                      "dateFin",
                      "presence",
                      "nombreInfluenceur",
                      "descriptionOffre",
                      "hashtags",
                      "compteTagger",
                      "ClientId"
                    ],
                    include:[Client,Interet]
                     });
       
    if(!data){
      res.status(400).json({error:"la campagne est introuvable!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}
//--------------------------------------------
//-------------------------------------------
//filtrage : age,ville,quartier,genre,situation familiale,
//niveau d'etude,langue

exports.filtrage=async (req,res)=>{
       
      //!!!!!!!
}

//-------------------------------------------------
//editer une campagne 
//method editer sa marche aussi si vous voulez editer une seul champs
//editer a base de condition id='' --> valuer id ce trouve dans params URL
exports.update=async (req,res)=>{

 try{
  const {
   titre,
   dateDebut,
   dateFin,
   presence,
   nombreInfluenceur,  
   descriptionOffre,
   hashtags,
   compteTagger,
   ClientId
  }=req.body; 

  const data=await  Campagne.update({
                    titre,
                    dateDebut,
                    dateFin,
                    presence,
                    nombreInfluenceur, 
                    descriptionOffre,
                    hashtags,
                    compteTagger,
                    ClientId
                     },{
                       where:{id:req.params.id}
                     })
      
    if(data<=0){
    res.status(400).json({error:"On peut pas editer la campagne!"});
    }else{
      res.status(200).json(data);

  
    }
 }catch(err){
  res.status(400).json({err:err});
 }
}

//---------------------------------------------
//supprimer une campagne
exports.delete= async (req,res)=>{
 
 try{
  const data=await  Campagne.destroy({
                     where:{id:req.params.id}
                      })
      
    if(!data){
    res.status(400).json({error:"On peut pas supprimer la campagne!"});
    }else{
      res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json({err:err});
 }
}
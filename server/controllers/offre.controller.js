const {Offre, Influenceur, Campagne, Client}=require("../models");
const Op = require('Sequelize').Op
const {QueryTypes }=require('Sequelize');
const sequelize=require("../config/db");

//-------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter Offre:
exports.addOffre=async (req,res)=>{
   

  try{
   const data=await Offre.create({
                          CampagneId:req.params.campagneId,
                          InfluenceurId:req.params.influenceurId,
                          status:"En cours traitement"
                                })
       
    if(!data){
      res.status(400).json({message:"On peut pas créer  offre!"});
    }else{
      res.status(200).json(data);
    }

  }catch(err){
   res.status(400).json(err);
  }
}

//----------------------------------------------
// afficher tout les offres
exports.getAll=async (req,res)=>{
 try{

  const data=await Offre.findAll();
      
    if(!data){
    res.status(400).json({error:"les Offres sont introuvables!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}

//------------------------------------------------------
//afficher l'offre by id
exports.getId=async (req,res)=>{
 try{
  const data=await Offre.findOne({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
    if(!data){
    res.status(400).json({error:"trouve l'Offre!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}

//!---------------------------------------------------------

//afficher l'offre by id
exports.getCampagneId=async (req,res)=>{
  try{
   const data=await Offre.findAll({
    where:{
      CampagneId:req.params.campagneId
     }
   });
       
     if(!data){
     res.status(400).json({error:"trouve l'Offre using campagne Id!"});
     }else{
     res.status(200).json(data);
     }
 
  }catch(err){
   res.status(400).json(err);
  }
 }

 //!----------------------------------------------------------

 
//afficher l'offre by id
exports.getOffreAccepterByInfluenceurId=async (req,res)=>{
  try{
   const data=await Offre.findAll({
    where:{
      [Op.and]:[
       {InfluenceurId:req.params.influenceurId},
       { status:"Accepter"},       
      ]

      }
   });

  /* const data=await Campagne.findAll({
    include:[{
      model:Influenceur,
      include:[
        {model:Offre}
      ]
    }]
   });*/

//const data = await sequelize.query("SELECT * FROM `offres`", { type: QueryTypes.SELECT });
       
     if(!data){
     res.status(400).json({error:"trouve l'Offre accepter using Influenceur Id!"});
     }else{
     res.status(200).json(data);
     }
 
  }catch(err){
   res.status(400).json(err);
  }
 }
//--------------------------------------------------------------
//no means i change this after 
exports.update=async (req,res)=>{
 try{
  const data=await Offre.update(
   {
    status:req.body.status,
   },{
    where:{
     CampagneId:req.params.campagneId,
     InfluenceurId:req.params.influenceurId
    }
  });
      
    if(!data){ 
    res.status(400).json({error:"on peut pas editer offre!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json(err);
 }
}
 
//---------------------------------------------
//change new to old offre:



exports.newOffre=async (req,res)=>{
  try{
   const data=await Offre.findAll({
     where:{
      [Op.and]:[
       {InfluenceurId:req.params.influenceurId},
       {status:"En cours traitement"}
       
     ]
      }
     }
   )
 
       
     if(!data){ 
     res.status(400).json({error:"Not found new Offre!"});
     }else{
     res.status(200).json(data);
     }
 
  }catch(err){
   res.status(400).json(err);
  }
 }

 
/*exports.newOffre=async (req,res)=>{
 try{
  const data=await Offre.findAll({
    where:{
     [Op.and]:[
      {InfluenceurId:req.params.influenceurId},
      {
        [Op.and]:[
         
           { status:{ [Op.ne]:"Accepter"}},
           { status:{ [Op.ne]:"Refuser"}}
          
        ]
      }
      
    ]
     }
    }
  )

      
    if(!data){ 
    res.status(400).json({error:"Not found new Offre!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json(err);
 }
}*/

//-----------------------------------------------
//accepter offre:
exports.accepterOffre=async (req,res)=>{
  
 const campagneData=await Campagne.findOne({
  where:{
    id:req.params.campagneId
  }
 })


  Offre.count({
    where:{
      status:"Accepter",
      CampagneId:req.params.campagneId,
    }
  }).then(async (countOffreAccepter)=>{
     if(campagneData.nombreInfluenceur-1>countOffreAccepter){
        
         try{
          const data=await Offre.update(
          {
            status:"Accepter"
          },{
            where:{
            CampagneId:req.params.campagneId,
            InfluenceurId:req.params.influenceurId
            }
          });
              
            if(!data){ 
            res.status(400).json({error:"On peut pas accepter l'offre!"});
            }else{
            res.status(200).json(data);
            }
        
        }catch(err){
          res.status(400).json(err);
        }


     }else if(campagneData.nombreInfluenceur-1===countOffreAccepter){
      try{
        console.log("ele -1 ")
      const data=await Offre.update(
        {
          status:"Accepter"
        },{
          where:{
          CampagneId:req.params.campagneId,
          InfluenceurId:req.params.influenceurId
          }
        });
  
            
          if(!data){ 
          res.status(400).json({error:"On peut pas accepter l'offre!"});
          }else{
          console.log("update offre to late")
          res.status(200).json(data);
         
           const updateData=await Offre.findAll({
            where:{
             CampagneId:req.params.campagneId,
             status:"En cours traitement"
            }});
          
            updateData.forEach(async (ele)=>{
                const resultat=await Offre.update({
                  status:"Late"
                },{
                  where:{
                    CampagneId:ele.dataValues.CampagneId,
                    InfluenceurId:ele.dataValues.InfluenceurId
                  }
                })
            })
      
          }
      
      }catch(err){
        res.status(400).json(err);
      }

        
     }else{
      res.status(200).json({
        message:"tu peux pas accepter cette offre il est deja saturé"
      })
     }
  }).catch((err)=>{
     res.status(400).json(err)
  })
 
}
//-----------------------------------------------
//refuser offre:

exports.refuserOffre=async (req,res)=>{
  
   
 const campagneData=await Campagne.findOne({
  where:{
    id:req.params.campagneId
  }
 })


  Offre.count({
    where:{
      status:"Accepter",
      CampagneId:req.params.campagneId,
    }
  }).then(async (countOffreAccepter)=>{
     if(countOffreAccepter<campagneData.nombreInfluenceur){
        
         try{
          const data=await Offre.update(
          {
            status:"Refuser"
          },{
            where:{
            CampagneId:req.params.campagneId,
            InfluenceurId:req.params.influenceurId
            }
          });
              
            if(!data){ 
            res.status(400).json({error:"On peut pas Refuser l'offre!"});
            }else{
            res.status(200).json(data);
            }
        
        }catch(err){
          res.status(400).json(err);
        }


     }else{
      res.status(200).json({
        message:"tu peux pas Refuser cette offre il est deja saturé"
      })
     }
  }).catch((err)=>{
     res.status(400).json(err)
  })
 
 }
 

//-----------------------------------------------
//supprimer offre
exports.delete=async (req,res)=>{
 try{
  const data=await Offre.destroy({
   where:{
    CampagneId:req.params.campagneId,
    InfluenceurId:req.params.influenceurId
   }
  });
      
    if(!data){
    res.status(400).json({error:"on peut pas supprimer offre!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json(err);
 }
}


//!------------------------------------------------------

//* get count of all offre
exports.getCountAllOffre=async (req,res)=>{
 
  try{
   const data=await Offre.count();
   res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  } 
}
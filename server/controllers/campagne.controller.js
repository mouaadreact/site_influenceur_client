const {Campagne}=require("../models");

//-------------------------------------------------------------


exports.addCampagne=async(req,res)=>{
   try{
    console.log(req.body);
    const {
     titre,
     dateDebut,
     dateFin,
     presence,
     nombreInfluenceur, 
     DescriptionOffre,
     hashtags,
     compteTagger
    }=req.body; 

    const data=await Campagne.create({
                                titre,
                                dateDebut,
                                dateFin,
                                presence,
                                nombreInfluenceur, 
                                DescriptionOffre,
                                hashtags,
                                compteTagger
                                  })
        
    if(!data){
     res.json({message:"can't create campagne!"});
    }
     res.status(200).json(data);
   }catch(err){
    res.status(400).json(err);
   }
}

 //----------------------------------------------------
 
//afficher tout les Campagnes
exports.getAll=async (req,res)=>{
  try{
   const data=await Campagne.findAll()
   if(!data){
    res.json({message:"Campagne introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//get by specific id
exports.getId=async (req,res)=>{
 
  try{
   const data=await Campagne.findOne({
                     where:{id:req.params.id}
                     });
       
   if(!data){
    res.json({message:"Campagne introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//update campagne
exports.update=async (req,res)=>{

 try{
  const {
   titre,
   dateDebut,
   dateFin,
   presence,
   nombreInfluenceur, 
   DescriptionOffre,
   hashtags,
   compteTagger
  }=req.body; 

  const data=await  Campagne.update({
                    titre,
                    dateDebut,
                    dateFin,
                    presence,
                    nombreInfluenceur, 
                    DescriptionOffre,
                    hashtags,
                    compteTagger
                     },{
                       where:{id:req.params.id}
                     })
      
  if(data<=0){
   res.json({message:"Campagne not update!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}


//delete campagnes
exports.delete= async (req,res)=>{
 
 try{
  const data=await  Campagne.destroy({
                     where:{id:req.params.id}
                      })
      
  if(!data){
   res.json({message:"Campagne non supprimer!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
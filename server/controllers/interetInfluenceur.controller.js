
    const {InteretInfluenceur}=require("../models");
    //-------------------------------------------
    
    //add etat Paiment:
    exports.addInteretInfluenceur=async (req,res)=>{
    
      try{
       const data=await InteretInfluenceur.create({
                              InteretId:req.params.interetId,
                              InfluenceurId:req.params.influenceurId,
                                    })


           
       if(!data){
        res.json({message:"can't create Interet Influenceur!"});
       }
        res.status(200).json(data);
      }catch(err){
       res.status(400).json(err);
      }
    }
    
    //-----------------------------------------------
    //all data
    exports.getAll=async (req,res)=>{
     try{
    
      const data=await InteretInfluenceur.findAll();
          
      if(!data){
       res.json({message:"Interet Influenceur introuvable!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //find all influenceur d'un interet
    exports.getIdInteret=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.findAll({
       where:{
        InteretId:req.params.interetId
       }
      });
          
      if(!data){
       res.json({message:"can't find InteretInfleunceur by interet!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error etat Paiment !!!"});
     }
    }
    //--------------------------------------------------------------
     //find all interet d'un influenceur
    exports.getIdInfluenceur=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.findAll({
       where:{
        InfluenceurId:req.params.influenceurId
       }
      });
          
      if(!data){
       res.json({message:"can't find InteretInfleunceur by influenceur!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error etat Paiment !!!"});
     }
    }

    
    //-----------------------------------------------
    //delete
    exports.delete=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.destroy({
       where:{
        InteretId:req.params.interetId,
        InfluenceurId:req.params.influenceurId,
       }
      });
          
      if(!data){
       res.json({message:"can't delete!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
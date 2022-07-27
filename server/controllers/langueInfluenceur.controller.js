
    const {LangueInfluenceur}=require("../models");
    //-------------------------------------------
    
    //add langue influenceur :
    exports.addLangueInfluenceur=async (req,res)=>{
    
      try{
       const data=await LangueInfluenceur.create({
                              LangueId:req.params.langueId,
                              InfluenceurId:req.params.influenceurId,
                                    })


           
       if(!data){
        res.json({message:"can't create Langue Influenceur!"});
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
    
      const data=await LangueInfluenceur.findAll();
          
      if(!data){
       res.json({message:"Langue Influenceur introuvable!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //find all influenceur d'un langue
    exports.getIdLangue=async (req,res)=>{
     try{
      const data=await LangueInfluenceur.findAll({
       where:{
        LangueId:req.params.langueId
       }
      });
          
      if(!data){
       res.json({message:"can't find LangueInfluenceur by langue!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error etat Paiment !!!"});
     }
    }
    //--------------------------------------------------------------
     //find all langue d'un influenceur
    exports.getIdInfluenceur=async (req,res)=>{
     try{
      const data=await LangueInfluenceur.findAll({
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
      const data=await LangueInfluenceur.destroy({
       where:{
        LangueId:req.params.langueId,
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
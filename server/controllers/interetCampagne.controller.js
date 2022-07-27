
    const {InteretCampagne}=require("../models");
    //-------------------------------------------
    
    //add etat Paiment:
    exports.addInteretCampagne=async (req,res)=>{
    
      try{
       const data=await InteretCampagne.create({
                              InteretId:req.params.interetId,
                              CampagneId:req.params.campagneId
                                    })


           
       if(!data){
        res.json({message:"can't create Interet Campagne!"});
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
    
      const data=await InteretCampagne.findAll();
          
      if(!data){
       res.json({message:"Interet Campagne introuvable!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //find all Campagne d'un interet
    exports.getIdInteret=async (req,res)=>{
     try{
      const data=await InteretCampagne.findAll({
       where:{
        InteretId:req.params.interetId
       }
      });
          
      if(!data){
       res.json({message:"can't find InteretCampagne by interet!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error Interet Campagne !!!"});
     }
    }
    //--------------------------------------------------------------
     //find all interet d'un influenceur
    exports.getIdCampagne=async (req,res)=>{
     try{
      const data=await InteretCampagne.findAll({
       where:{
        CampagneId:req.params.campagneId
       }
      });
          
      if(!data){
       res.json({message:"can't find InteretCampagne by Campagne!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error Interet Campagne !!!"});
     }
    }

    
    //-----------------------------------------------
    //delete
    exports.delete=async (req,res)=>{
     try{ 
      const data=await InteretCampagne.destroy({
       where:{
        InteretId:req.params.interetId,
        CampagneId:req.params.campagneId
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

    const {EtatPaiment}=require("../models");
    //-------------------------------------------
    
    //add etat Paiment:
    exports.addEtatPaiment=async (req,res)=>{
    
      try{
       const data=await EtatPaiment.create({
                              CampagneId:req.params.campagneId,
                              InfluenceurId:req.params.influenceurId,
                              tarif:req.body.tarif, //double
                              dateReglement:req.body.dateReglement,//date
                                    })


           
       if(!data){
        res.json({message:"can't create etat paiment!"});
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
    
      const data=await EtatPaiment.findAll();
          
      if(!data){
       res.json({message:"etat paiment introuvable!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    
    exports.getId=async (req,res)=>{
     try{
      const data=await EtatPaiment.findOne({
       where:{
        CampagneId:req.params.campagneId,
        InfluenceurId:req.params.influenceurId
       }
      });
          
      if(!data){
       res.json({message:"can't find etat Paiment!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json({err:"error etat Paiment !!!"});
     }
    }
    //--------------------------------------------------------------
    
    exports.update=async (req,res)=>{
     try{
      const data=await EtatPaiment.update(
       {
        tarif:req.body.tarif,
        dateReglement:req.body.dateReglement,
       },{
        where:{
         CampagneId:req.params.campagneId,
         InfluenceurId:req.params.influenceurId
        }
      });
          
      if(!data){ 
       res.json({message:"can't update!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    
    //-----------------------------------------------
    //delete
    exports.delete=async (req,res)=>{
     try{
      const data=await EtatPaiment.destroy({
       where:{
        CampagneId:req.params.campagneId,
        InfluenceurId:req.params.influenceurId
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
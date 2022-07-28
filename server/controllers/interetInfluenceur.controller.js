
    const {InteretInfluenceur}=require("../models");
    //-------------------------------------------
    //Remarque: en besoin de utilise IF ELSE apres retourne des données
   //car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

    //ajouter interetInfluenceur:
    exports.addInteretInfluenceur=async (req,res)=>{
    
      try{
       const data=await InteretInfluenceur.create({
                              InteretId:req.params.interetId,
                              InfluenceurId:req.params.influenceurId,
                                    });
           
        if(!data){
          res.status(400).json({error:"On peur pas créer Interet Influenceur!"});
        }else{
          res.status(200).json(data);
        }
      }catch(err){
       res.status(400).json(err);
      }
    }
    
    //-----------------------------------------------
    //afficher tout les interets Influenceurs
    exports.getAll=async (req,res)=>{
     try{
    
      const data=await InteretInfluenceur.findAll();
          
        if(!data){
        res.status(400).json({error:"les InteretInfluenceurs sont introuvables!"});
        }else{
          res.status(200).json(data);
        }  

     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //trouve tout les influenceurs d'un interet
    exports.getIdInteret=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.findAll({
       where:{
        InteretId:req.params.interetId
       }
      }); 
          
        if(!data){
        res.status(400).json({error:"On peut trouver les InteretInfleunceurs utilisant interet!"});
        }else{
        res.status(200).json(data);
        }

     }catch(err){
      res.status(400).json(err);
     }
    }
    //--------------------------------------------------------------
     //trouve tout les interets d'un influenceur
    exports.getIdInfluenceur=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.findAll({
       where:{
        InfluenceurId:req.params.influenceurId
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas trouver InteretInfleunceur utilisant influenceur!"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }

    
    //-----------------------------------------------
    //supprimer interetInfluenceur
    exports.delete=async (req,res)=>{
     try{
      const data=await InteretInfluenceur.destroy({
       where:{
        InteretId:req.params.interetId,
        InfluenceurId:req.params.influenceurId,
       }
      });
          
          if(!data){
          res.status(400).json({error:"On peut pas supprimer InteretInfluenceur!"});
          }else{
          res.status(200).json(data);
          }
     }catch(err){
      res.status(400).json(err);
     }
    }
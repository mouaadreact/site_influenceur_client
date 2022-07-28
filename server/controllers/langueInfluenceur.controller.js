
    const {LangueInfluenceur}=require("../models");
    //-------------------------------------------
    //Remarque: en besoin de utilise IF ELSE apres retourne des données
    //car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

    //ajouter langue influenceur :
    exports.addLangueInfluenceur=async (req,res)=>{
    
      try{
       const data=await LangueInfluenceur.create({
                              LangueId:req.params.langueId,
                              InfluenceurId:req.params.influenceurId,
                                    })


           
          if(!data){
            res.status(400).json({error:"On peut pas créer Langue Influenceur!"});
          }else{
            res.status(200).json(data);
          }

      }catch(err){
       res.status(400).json(err);
      }
    }
    
    //-----------------------------------------------
    //tout les langues Influenceurs
    exports.getAll=async (req,res)=>{
     try{
    
      const data=await LangueInfluenceur.findAll();
          
        if(!data){
        res.status(400).json({error:"les langueInfluenceurs sont introuvables!"});
        }else{
        res.status(200).json(data);
        }

     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //trouve tout les influenceurs d'un langue
    exports.getIdLangue=async (req,res)=>{
     try{
      const data=await LangueInfluenceur.findAll({
       where:{
        LangueId:req.params.langueId
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas trouver LangueInfluenceur utilisant langueID!"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
    //--------------------------------------------------------------
     //trouve les langues d'un influenceur
    exports.getIdInfluenceur=async (req,res)=>{
     try{
      const data=await LangueInfluenceur.findAll({
       where:{
        InfluenceurId:req.params.influenceurId
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas Trouve InteretInfleunceur utilisant influenceurID!"});
        }else{
        res.status(200).json(data);
        }

     }catch(err){
      res.status(400).json(err);
     }
    }

    
    //-----------------------------------------------
    //supprimer les languesInfluenceurs
    exports.delete=async (req,res)=>{
     try{
      const data=await LangueInfluenceur.destroy({
       where:{
        LangueId:req.params.langueId,
        InfluenceurId:req.params.influenceurId,
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas Supprimer LangueInfluenceur"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }

    const {InteretCampagne,Interet,Campagne}=require("../models");
    //-------------------------------------------
    //Remarque: en besoin de utilise IF ELSE apres retourne des données
    //car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

    //ajouter l'interetCampagne
    exports.addInteretCampagne=async (req,res)=>{
    
      try{ 
       const data=await InteretCampagne.create({
                              InteretId:req.params.interetId,
                              CampagneId:req.params.campagneId
                                    })


           
       if(!data){
        res.status(400).json({error:"On peut pas Interet Campagne!"});
       }else{
        res.status(200).json(data);
       }
      }catch(err){
       res.status(400).json(err);
      }
    }
    
    //-----------------------------------------------
    //afficher tout les interetCampagnes
    exports.getAll=async (req,res)=>{
     try{
    
      const data=await InteretCampagne.findAll();
          
        if(!data){
        res.status(400).json({error:"les Interet Campagne sont introuvables!"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //------------------------------------------------------
    //trouve tout Campagne d'un interet
    exports.getIdInteret=async (req,res)=>{
     try{
      const data=await InteretCampagne.findAll({
       where:{
        InteretId:req.params.interetId
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas trouve les campagnes d'un interet!"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
    //--------------------------------------------------------------
     //trouve tout les interet d'un campagne
    exports.getIdCampagne=async (req,res)=>{
     try{
      /*const data=await InteretCampagne.findAll({
       where:{ 
        CampagneId:req.params.campagneId
       },
       include:Interet
      });*/
      const data=await Campagne.findAll({
        where:{
          id:req.params.campagneId
        },
        include:[Interet]
      })
          
          if(!data){
          res.status(400).json({error:"On peut pas trouve les interet d'un campagne"});
          }else{
          res.status(200).json(data);
          }
     }catch(err){
      res.status(400).json(err);
     }
    }

    //------------------------------------------------------
    //filtrage par centre interet

    exports.filtreParCentreInteret=async (req,res)=>{
      try{
        const {interetNom}=req.body;
       
        const data=await Interet.findOne({
          where:{interetNom},
          include:{
            model: Campagne,
            through: { attributes: [] }
         }
        });

        if(!data){
          res.status(400).json({err:"Error Filtrage InteretCampagne! "});
        }else{
          res.status(200).json(data);
        }
          

      }catch(err){

       res.status(400).json(err);

      }
     }


    //-----------------------------------------------
    //supprimer l'interetCampagne
    exports.delete=async (req,res)=>{
     try{ 
      const data=await InteretCampagne.destroy({
       where:{
        InteretId:req.params.interetId,
        CampagneId:req.params.campagneId
       }
      });
          
          if(!data){
          res.status(400).json({error:"On peut pas Supprimer ligne d'interetCampagne !"});
          }else{
          res.status(200).json(data);
          } 
     }catch(err){
      res.status(400).json(err);
     }
    }

//------------------------------
exports.deleteInteretCampagne=async(req,res)=>{
  try{
    const data=await InteretCampagne.destroy({
      where:{
       CampagneId:req.params.campagneId
      }
     });

     if(!data){
      res.status(400).json({error:"On peut pas Supprimer l'interet d'un Campagne !"});
      }else{
      res.status(200).json(data);
      } 

  }catch(err){
    res.status(400).json(err);
  }
}
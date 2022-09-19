
    const {EtatPaiment}=require("../models");
    const {QueryTypes }=require('Sequelize');
    const sequelize=require("../config/db");
    //-------------------------------------------
    //Remarque: en besoin de utilise IF ELSE apres retourne des données
    //car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

    //etatPaiment est une table creer a base
    // de association many to many de campagne et influenceur
    //primary key est CampagneId et influenceurId
   //*----------------------------------------------------
    //!Ajouter une etatPaiment:
    exports.addEtatPaiment=async (req,res)=>{
    
      try{
       const data=await EtatPaiment.create({
                              CampagneId:req.params.campagneId,
                              InfluenceurId:req.params.influenceurId,
                              tarif:req.body.tarif, //double
                              dateReglement:req.body.dateReglement,//date
                                    })


           
        if(!data){
          res.status(400).json({error:"On peut pas créer une etatPaiment!"});
        }else{
          res.status(200).json(data);
        }
      }catch(err){
       res.status(400).json(err);
      }
    }
    //*-------------------------------------------
    //! add etat payment but using req.body 
    
     //!Ajouter une etatPaiment:
     exports.addEtatPaimentBody=async (req,res)=>{
    
      try{
        const { 
          campagneId,
          influenceurId,
          tarif,
          dateReglement
        } =req.body;
       const data=await EtatPaiment.create({
                              CampagneId:campagneId,
                              InfluenceurId:influenceurId,
                              tarif:tarif, //double
                              dateReglement:dateReglement,//date
                                    })


           
        if(!data){
          res.status(400).json({error:"On peut pas créer une etatPaiment by Body!"});
        }else{
          res.status(200).json(data);
        }
      }catch(err){
       res.status(400).json(err);
      }
    }

    //*-----------------------------------------------
    //!afficher les EtatPaiments
    exports.getAll=async (req,res)=>{ 
     try{
     // const data=await EtatPaiment.findAll();
      const data = await sequelize.query(` 
      SELECT * FROM etatpaiments e , campagnes c , influenceurs i
      WHERE  e.CampagneId=c.id 
      AND i.id=e.InfluenceurId`, 
      { type: QueryTypes.SELECT }); 
            
        if(!data){
        res.status(400).json({error:"les etatPaiments sont introuvables!"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    //*------------------------------------------------------
    //!afficher une seul EtatPaiment
    exports.getId=async (req,res)=>{
     try{
      const data=await EtatPaiment.findOne({
       where:{
        CampagneId:req.params.campagneId,
        InfluenceurId:req.params.influenceurId
       }
      });
          
        if(!data){
        res.status(400).json({error:"l'etatPaiment est introuvable!"});
        }else{
        res.status(200).json(data);
        } 
     }catch(err){
      res.status(400).json(err);
     }
    }
    //*--------------------------------------------------------------
    
    //get by id campagne

    exports.getIdCampagne=async (req,res)=>{
      try{
       /*const data=await EtatPaiment.findAll({
        where:{
         CampagneId:req.params.campagneId,
        }
       });*/

       const data = await sequelize.query(` 
        SELECT * FROM etatpaiments e , campagnes c , influenceurs i
        WHERE  e.CampagneId=c.id 
        AND i.id=e.InfluenceurId
        AND e.CampagneId=${req.params.campagneId}`, 
      { type: QueryTypes.SELECT });
           
         if(!data){
         res.status(400).json({error:"l'etatPaiment est introuvable by id Campagne!"});
         }else{
         res.status(200).json(data);
         } 
      }catch(err){
       res.status(400).json(err);
      }
     }
    
     //*---------------------------------------------------
     //!get by id influenceur:

    exports.getIdInfluenceur=async (req,res)=>{
      try{
       const data=await EtatPaiment.findAll({
        where:{
          InfluenceurId:req.params.influenceurId
        }
       });
           
         if(!data){
         res.status(400).json({error:"l'etatPaiment est introuvable by id Influenceur!"});
         }else{
         res.status(200).json(data);
         } 
      }catch(err){
       res.status(400).json(err);
      }
     }
    
    //*---------------------------------------------------
    //!editer une EtatPaiment
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
        res.status(400).json({error:"On peut pas editer l'EtatPaiment !"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
    
    
    //*-----------------------------------------------
    //!supprimer une EtatPaiment
    exports.delete=async (req,res)=>{
     try{
      const data=await EtatPaiment.destroy({
       where:{
        CampagneId:req.params.campagneId,
        InfluenceurId:req.params.influenceurId
       }
      });
          
        if(!data){
        res.status(400).json({error:"On peut pas supprimer l'etatPaiment !"});
        }else{
        res.status(200).json(data);
        }
     }catch(err){
      res.status(400).json(err);
     }
    }
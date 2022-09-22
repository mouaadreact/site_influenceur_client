
const {Client, Campagne}=require("../models");
const SchemaValidation=require("../validators/client.validator");
const {QueryTypes }=require('Sequelize');
const sequelize=require("../config/db");
//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter les clients 
exports.addClient=async(req,res)=>{
     
     const {
      raisonSociale,
      pays,
      ville,
      quartier,
      nomDirecteur,
      telephone,
      email}=req.body;

      //valider les champs qui envoient a partir de "POST request"
      //validation a base de JOI (aller vers fichier validators)
     let validation=SchemaValidation.validate(
                                    {raisonSociale,
                                      pays,
                                      ville,
                                      quartier,
                                      nomDirecteur,
                                      telephone,
                                      email})

     if(validation.error){
       res.status(400).json({validation:validation.error.details[0].message})
      }else{
 
      try{

            const client= await Client.create({
                  raisonSociale,
                  pays,
                  ville,
                  quartier, 
                  nomDirecteur,
                  telephone,
                  email,
                  statusActive:true
                 });

                if(!client){
                  res.status(400).json({error:"On peut pas créer un client!"})
                }else{
                  res.status(200).json(client);
                }

       }catch(err){
                res.status(400).json(err);
      }
  
    }
    }

//afficher tout les clients sans condition:
exports.getAll=async (req,res)=>{
 
      try{
       const data=await Client.findAll({
        attributes:[
                  "id",
                  "raisonSociale",
                  "pays",
                  "ville",
                  "quartier",
                  "nomDirecteur",
                  "telephone",
                  "email",
                  "statusActive"
                   ]
       });
           
        if(!data){
          res.status(400).json({error:"les clients sont introuvables!"});
        }else{
          res.status(200).json(data);
        }
      }catch(err){
       res.status(400).json(err);
      } 
    }
//!---------------------------------------------------  


//afficher un seul client utilisant Id
exports.getId=async (req,res)=>{
 
  try{
      const data=await Client.findOne({
            where:{id:req.params.id}
      });
          
          if(!data){
          res.status(400).json({error:"le client est introuvable!"});
          }else{
          res.status(200).json(data);
          }
     }catch(err){
      res.status(400).json(err);
     }
}
//!---------------------------------------------------


//afficher tout les clients sans condition:
exports.getAllActiveCompte=async (req,res)=>{
 
  try{
   const data=await Client.findAll({
      where:{statusActive:true}
   });
       
    if(!data){
      res.status(400).json({error:"les clients sont introuvables!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  } 
}



//!---------------------------------------------------------
//editer les clients
//method editer sa marche aussi si vous voulez editer une seul champs
//editer a base de condition id='' --> valuer id ce trouve dans params URL
exports.Update=async (req,res)=>{

 try{
  const {
    raisonSociale,
    pays,
    ville,
    quartier,
    nomDirecteur,
    telephone,
    email}=req.body;
   
  const data=await  Client.update({
                        raisonSociale,
                        pays,
                        ville,
                        quartier,
                        nomDirecteur,
                        telephone,
                        email
                    },{
                     where:{id:req.params.id}
                    })
    
    
    if(!data){
    res.status(400).json({error:"On peut pas editer le client!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json(err);
 }
}


// supprimer les clients utilise id qui exist dans params URL
exports.Delete= async (req,res)=>{
 
 try{ 
  const data=await  Client.destroy({
                     where:{id:req.params.id}
                      })
      
      if(!data){
      res.status(400).json({error:"On peut pas supprimer le client !"});
      }else{
      res.status(200).json(data);
      }
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}

//!-------------------------------------
//* get count of all client

exports.getCountAllClient=async (req,res)=>{
 
  try{
   const data=await Client.count();
   res.status(200).json(data);
    
  }catch(err){
   res.status(400).json(err);
  } 
}

//!-------------------------------------------------------------------
//*nombre campgne of client

exports.getCountCampagneOfClient=async(req,res)=>{ 


  try{
    const data = await sequelize.query(`
    select count(*) as nombreCampagne, raisonSociale 
    from clients cl , campagnes ca
     where cl.id=ca.ClientId group by ca.ClientId `, 
   { type: QueryTypes.SELECT });

    if(!data){
        res.status(400).json({error:"we don't have a statistics of client/campagne"})
    }else{
        res.status(200).json(data)
    }

  }catch(err){

  }
}

//!------------------------------------------
//*--active desactive client


exports.changeEtatStatusActive=async (req,res)=>{
 
  try{
   const data=await Client.update({
    statusActive:req.body.statusActive
    },
    {
      where: { id: req.params.id },
    }
   );
   if(!data){
    res.status(400).json({err:"can t change etat active of client"});
   }else{
     res.status(200).json(data);
   }
  
    
  }catch(err){
   res.status(400).json(err);
  } 
}

const {Client}=require("../models");
const SchemaValidation=require("../validators/client.validator");

//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter les clients 
exports.addClient=async(req,res)=>{
     
     const {
      nomSociete,
      pays,
      ville,
      quartier,
      nomDirecteur,
      telephone,
      email}=req.body;

      //valider les champs qui envoient a partir de "POST request"
      //validation a base de JOI (aller vers fichier validators)
     let validation=SchemaValidation.validate(
                                    {nomSociete,
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
                  nomSociete,
                  pays,
                  ville,
                  quartier, 
                  nomDirecteur,
                  telephone,
                  email
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
                  "nomSociete",
                  "pays",
                  "ville",
                  "quartier",
                  "nomDirecteur",
                  "telephone",
                  "email"
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

//editer les clients
//method editer sa marche aussi si vous voulez editer une seul champs
//editer a base de condition id='' --> valuer id ce trouve dans params URL
exports.Update=async (req,res)=>{

 try{
  const {
    nomSociete,
    pays,
    ville,
    quartier,
    nomDirecteur,
    telephone,
    email}=req.body;
   
  const data=await  Client.update({
                        nomSociete,
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
  res.status(400).json({err:err.errors[0].message});
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


const {Influenceur,TemporaireInfluenceur}=require("../models");
const SchemaValidation=require("../validators/influenceur.validator")
const UsernameByEmail=require("../utils/usernameByEmail");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION;
 
//-------------------------------------------------------------

//valider compte de temporaire influenceur
//I like to test add token in database
//email send link like http://localhost:3000/api/v1/influenceur/confirmer-email?email=** 
exports.validerCompte=async(req,res)=>{
     
     const {email}=req.query;
     //test send email in query
     console.log(`email : `+email);
     const temporaireInfluenceur=await TemporaireInfluenceur.update(
      {
        statusConfirmer:true
      }
      ,{
        where:{email:email} //email:email
      }
      );
     
      if(temporaireInfluenceur>0){
            var data=await TemporaireInfluenceur.findOne({where:{email}});
            data=data.dataValues;  
            //add influenceur:
            if(data){
              try {
                const resultat=await Influenceur.create({
                  email:data.email,
                  username:data.username,
                  password:data.password,
                  statusAccepterConditionGenerale:false,
                   statusEtatActiver:true
                  });
                if(!resultat){
                  res.status(400).json({err:"can' t add influenceur ! "});
                  }
                  res.status(400).json(resultat);
            }catch(err){
              res.status(400).json({err:err});
            }
          }
      }else{
         res.status(400).json({err:"you need to signUp first"});
      }

    }

//completer compte d'influenceur
exports.completerProfil=async (req,res)=>{
 
  try{
    console.log(req.body);
    const {
            nom,
            prenom,
            genre,
            dateNaissance,
            instagramUsernameCompte,
            pays,
            ville,
            quartier,
            codePostal,
            situationFamiliale,
            nombreEnfant,
            niveauEtude,
            profession, 
            commentaire
          }=req.body;
   
      console.log(situationFamiliale)
      const data=await Influenceur.update({
            nom,
            prenom,
            genre,
            dateNaissance,
            instagramUsernameCompte,
            pays,
            ville,
            quartier,
            codePostal,
            situationFamiliale,
            nombreEnfant,
            niveauEtude,
            profession,
            commentaire 
      },{
        where:{id:req.params.id}
      })
          
      if(data<=0){
        res.json({message:"can't complete !"});
      } 
        res.status(200).json(data);
    }catch(err){
     res.status(400).json(err); 
    }
}
 //----------------------------------------------------
 
//afficher tout les influenceurs
exports.getAll=async (req,res)=>{
  try{
   const data=await Influenceur.findAll()
   if(!data){
    res.json({message:"influenceur introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//get by specific id
exports.getId=async (req,res)=>{
 
  try{
   const data=await Influenceur.findOne({
                     where:{id:req.params.id}
                     });
       
   if(!data){
    res.json({message:"influenceur introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//update influenceur
exports.update=async (req,res)=>{

 try{
  const {
    email,
    password,
    username,
    nom,
    prenom,
    genre,
    dateNaissance,
    instagramUsernameCompte,
    pays,
    ville,
    quartier,
    codePostal,
    situationFamiliale,
    nombreEnfant,
    niveauEtude,
    profession,
    token,
    commentaire
  }=req.body; 

  const data=await  Influenceur.update({
                    email, 
                    username,
                    password,
                    nom,
                    prenom,
                    genre,
                    dateNaissance,
                    instagramUsernameCompte,
                    pays,
                    ville,
                    quartier,
                    codePostal,
                    situationFamiliale,
                    nombreEnfant,
                    niveauEtude,
                    profession,
                    token,
                    commentaire
                  },{
                    where:{id:req.params.id}
                  })
      
  if(data<=0){
   res.json({message:"influenceur not update!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}


//delete influenceurs
exports.delete= async (req,res)=>{
 
 try{
  const data=await  Influenceur.destroy({
                     where:{id:req.params.id}
                      })
      
  if(!data){
   res.json({message:"influenceur non supprimer!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}

const {Influenceur,TemporaireInfluenceur,LangueInfluenceur}=require("../models");
const SchemaValidation=require("../validators/influenceur.validator")
const UsernameByEmail=require("../utils/usernameByEmail");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION;
 
//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//login influenceur:

exports.login=async (req,res)=>{
  try{
   var countTempInf=await TemporaireInfluenceur.count({
                        where:{
                          email:req.body.email
                          }
                        });


    if(countTempInf>0){
      //si on reste dans etape1 
          
          var data=await TemporaireInfluenceur.findOne({
                         where:{email:req.body.email}
                         }); 
          data=data.dataValues;

        

          if(!data){
          res.json({error:"email not valid!"});

          }
          else{

          bcrypt.compare(req.body.password,data.password).then((same)=>{
          if(same){
          let token=jwt.sign({id:data.id,email:req.body.email,role:"userRole"},privateKey,{
          expiresIn:3*24*60*60*1000 });
          res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
          res.status(200).json({token:token})

          }else{
          res.status(400).json({err:"password not valid"});
          }
          })
          }

    }else{
      //si on passe vers etape 2
          
          var data=await Influenceur.findOne({
                        where:{email:req.body.email}
                        }); 
          data=data.dataValues;


          if(!data){
          res.json({error:"email not valid!"});

          }
          else{

          bcrypt.compare(req.body.password,data.password).then((same)=>{
          if(same){
          let token=jwt.sign({id:data.id,email:req.body.email,role:"userRole"},privateKey,{
          expiresIn:3*24*60*60*1000 });
          res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
          res.status(200).json({token:token})

          }else{
          res.status(400).json({err:"password not valid"});
          }
          })
          }



      }
    
  }catch(err){

     res.status(400).json({err:err});

  }
 }
 
 //-------------------------------------------------------------------

//logout :
//logout influenceur:
exports.logout = (req,res) =>{
  res.cookie('jwt','',{maxAge :1});
  res.redirect('/');
}

//--------------------------------------------------------------

//valider compte de temporaireInfluenceur
//j'aime l'ajoute de token dans la base de données
//email envoye link comme:
// http://localhost:3000/api/v1/influenceur/confirmer-email?email=** 
exports.validerCompte=async(req,res)=>{
     
     const {email}=req.query;
     const temporaireInfluenceurCount=await TemporaireInfluenceur.count(
      {
        where:{email} //email:email
      }
      ); 
     
      if(temporaireInfluenceurCount>0){
            var data=await TemporaireInfluenceur.findOne({where:{email}});
            data=data.dataValues;  
            //Ajouter les infos dans table influenceur:
            if(data){
              try {
                //creer influenceur
                const resultat=await Influenceur.create({
                  email:data.email,
                  username:data.username,
                  password:data.password,
                  statusAccepterConditionGenerale:false,
                   statusEtatActiver:true
                  });

                  if(!resultat){
                    res.status(400).json({error:"On peut pas créer un(e) Influenceur(e) ! "});
                  }else{
                    res.status(400).json(resultat);
                  }

                  //supprimer Temporaire:
                  const temporaireInfluenceurSupprimer=await TemporaireInfluenceur.destroy(
                      {
                        where:{email} //email:email
                      }
                    );
                     

              }catch(err){
                res.status(400).json({err:err});
              }
          }
      }else{
         res.status(400).json({error:"Vous avez besoin de registrer dans le site ! "});
      }

    }

//-----------------------------------------------------------
//complete etape 2: valideCompte Instg:

exports.valideCompteInstagram=async (req,res)=>{
 
  try{
    const {
            nom,
            prenom,
            genre,
            dateNaissance,
            instagramUsernameCompte, //add after compte youtube,facebook
          }=req.body;
   
      const data=await Influenceur.update({
            nom,
            prenom,
            genre,
            dateNaissance,
            instagramUsernameCompte
      },{
        where:{id:req.params.id}
      })
          
        if(data<=0){
          res.status(400).json({error:"On peut pas valideCompte instagram!"});
        }else{
          res.status(200).json(data);
        }
    }catch(err){
     res.status(400).json(err); 
    }
}

//---------------------------------------------------------------
//completer le compte d'influenceur
exports.completerProfil=async (req,res)=>{
 
  try{
    const {
            pays,
            ville,
            quartier,
            codePostal,
            situationFamiliale,
            nombreEnfant,
            niveauEtude,
            profession, 
            LangueId
            //commentaire
          }=req.body;
   
      const data=await Influenceur.update({
            pays,
            ville,
            quartier,
            codePostal,
            situationFamiliale,
            nombreEnfant,
            niveauEtude,
            profession,
            //commentaire 
      },{
        where:{id:req.params.id}
      })
        

          
        if(data<=0){
          res.status(400).json({error:"On peut pas complete Compte!"});
        }else{
            res.status(200).json(data);
            const langueData=LangueInfluenceur.create({
              LangueId,
              InfluenceurId:req.params.id,
            }); 
        }
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
        res.status(400).json({error:"les influenceurs sont introuvables !"});
      }else{
        res.status(200).json(data);
      }
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//afficher tout une influenceur BY id
exports.getId=async (req,res)=>{
 
  try{
   const data=await Influenceur.findOne({
                     where:{id:req.params.id}
                     });
       
    if(!data){
      res.status(400).json({error:"l'influenceur est introuvable!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//editer un influenceur
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
    res.status(400).json({error:"On peut pas editer l'influenceur!"});
    }else{
    res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}


//supprimer l'influenceur
exports.delete= async (req,res)=>{
 
 try{
  const data=await  Influenceur.destroy({
                     where:{id:req.params.id}
                      })
      
  if(!data){
   res.status(400).json({error:"On peut pas supprimer l'influenceur!"});
  }else{
   res.status(200).json(data);
  }
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
const {Campagne, Client, InteretCampagne, Interet, Offre}=require("../models");
 
const {SendOffre}=require("../utils/SendMailOffreToInfluenceurs")
//-------------------------------------------------------------
//Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"

//ajouter une Campagne
exports.addCampagne=async(req,res)=>{
   try{
    const {
     titre,
     dateDebut,
     dateFin,
     presence,
     nombreInfluenceur,  
     descriptionOffre,
     hashtags,
     compteTagger, 
     ClientId,
     listInfluenceur
    }=req.body; 
  
    
   const data=await Campagne.create({
                                titre,
                                dateDebut,
                                dateFin,
                                presence,
                                nombreInfluenceur, 
                                descriptionOffre,
                                hashtags,
                                compteTagger,
                                ClientId
                                  })

      if(!data){
      res.status(400).json({error:"On peut pas créer une campagne!"});
      }else{
         
        listInfluenceur.forEach(async (ele)=>{
          const resultatOffre=await Offre.create({
            CampagneId:data.dataValues.id,
            InfluenceurId:ele.id,
            status:"En cours traitement"
               })
        })

      SendOffre(listInfluenceur,`New Offre in Plateforme`,descriptionOffre)
      res.status(200).json(data);
 
      }
   }catch(err){  //testing error validators
    res.status(400).json({
      error:err
    }); //using 
   }
}

 //----------------------------------------------------
 
//afficher tout les Campagnes
exports.getAll=async (req,res)=>{
  try{
   const data=await Campagne.findAll({
    attributes:[
      "id",
      "titre",
      "dateDebut",
      "dateFin",
      "presence",
      "nombreInfluenceur",
      "descriptionOffre",
      "hashtags",
      "compteTagger",
      "ClientId"   
    ],
    include:[Client,Interet]
   })
    if(!data){
      res.status(400).json({error:"les campagnes sont introuvables!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json({err:err});
  }
  
}

//--------------------------------------------------
//afficher une seul campagne utilisant id
exports.getId=async (req,res)=>{
 
  try{ 
   const data=await Campagne.findOne({
                     where:{id:req.params.id},
                     attributes:[
                      "id",
                      "titre",
                      "dateDebut",
                      "dateFin",
                      "presence",
                      "nombreInfluenceur",
                      "descriptionOffre",
                      "hashtags",
                      "compteTagger",
                      "ClientId"
                    ],
                    include:[Client,Interet]
                     });
       
    if(!data){
      res.status(400).json({error:"la campagne est introuvable!"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//-------------------------------------------------
//editer une campagne 
//method editer sa marche aussi si vous voulez editer une seul champs
//editer a base de condition id='' --> valuer id ce trouve dans params URL
exports.update=async (req,res)=>{

 try{
  const {
   titre,
   dateDebut,
   dateFin,
   presence,
   nombreInfluenceur,  
   descriptionOffre,
   hashtags,
   compteTagger,
   ClientId
  }=req.body; 

  const data=await  Campagne.update({
                    titre,
                    dateDebut,
                    dateFin,
                    presence,
                    nombreInfluenceur, 
                    descriptionOffre,
                    hashtags,
                    compteTagger,
                    ClientId
                     },{
                       where:{id:req.params.id}
                     })
      
    if(data<=0){
    res.status(400).json({error:"On peut pas editer la campagne!"});
    }else{
      res.status(200).json(data);

  
    }
 }catch(err){
  res.status(400).json({err:err});
 }
}

//---------------------------------------------
//supprimer une campagne
exports.delete= async (req,res)=>{
 
 try{
  const data=await  Campagne.destroy({
                     where:{id:req.params.id}
                      })
      
    if(!data){
    res.status(400).json({error:"On peut pas supprimer la campagne!"});
    }else{
      res.status(200).json(data);
    }
 }catch(err){
  res.status(400).json({err:err});
 }
}


//?------------------------------------------------------------


//filtrage centre interet , clientId
exports.filtrage=async (req,res)=>{
  try{
    //* date debut max min
  const {
    dateDebutMin,
    dateDebutMax,
    dateFinMin,
    dateFinMax,
    presence,
    nombreInfluenceur, 
    ClientId,
    interet
  }=req.body;

  console.log(req.body)

   var obj={};

   if(presence=="true"){
    obj.presence=true;
   } 
   if(presence=="false"){
    obj.presence=false;
   }
   //*----------------------------
   if(nombreInfluenceur){
    obj.nombreInfluenceur=nombreInfluenceur;
  }
  if(ClientId){
    obj.ClientId=ClientId;
  }

   
    var data=await Campagne.findAll({
      where:obj,
      include:[Interet]
    })
      if(!data){
        res.status(400).json({error:"On peut pas filtrer Influenceur !"});
      }else{
        
            
            //*---------------------------------------
            //*interet:
           if(interet?.length>0){
            console.log("interet")
               data = data.filter(
                (ele)=>{
                  let ok=false;
                   
                   for(let i=0;i<ele.dataValues.Interets.length;i++){     
                       interet.forEach((itr)=>{
                        if(itr==ele.dataValues.Interets[i].id){ 
                          ok=true;
                          
                       }
                      })
                       if(interet.length==0){
                         ok=true 
                       }
                       
                        
                  }
                  return ok;
                  })
            }

          
            
            
       if(dateDebutMin){
          data=data.filter((ele,index)=>{  
           return (
            new Date(ele.dateDebut).getTime()>=new Date(dateDebutMin).getTime() 
            &&
            new Date(ele.dateDebut).getTime()<=new Date(dateDebutMax).getTime()
             );      
          });

        }

        if(dateFinMin){
            data=data.filter((ele)=>{  
             return (
              new Date(ele.dateFin).getTime()>=new Date(dateFinMin).getTime() 
              &&
              new Date(ele.dateFin).getTime()<=new Date(dateFinMax).getTime()
               );      
            });
  
          }
      


        res.status(200).json(data);
        
        
       
      }
  }catch(err){
   res.status(400).json(err);
  }
  
}


//!------------------------------------------------------

//* get count of all campagne
exports.getCountAllCampagne=async (req,res)=>{
 
  try{
   const data=await Campagne.count();
   res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  } 
}
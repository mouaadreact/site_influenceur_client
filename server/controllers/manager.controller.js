
const {Manager}=require("../models");
const SchemaValidation=require("../validators/manager.validator");
const bcrypt=require("bcrypt");


//-------------------------------------------------------------
 //Remarque: en besoin de utilise IF ELSE apres retourne des données
//car si n'a fait pas il exits une error d'envoyer deux(2) response --> "si on a une error dans request"


//register un(e) manager
exports.addAdmin=async(req,res)=>{
  
     const {email,password,username}=req.body;
     let validation=SchemaValidation.validate({email,username,password})

     if(validation.error){
       res.json({validation:validation.error.details[0].message})
      }else{
      
     Manager.count({
      where:{email:email}
     })
     .then(doc=>{ 
      if(doc!=0){
       res.status(400).error("this is email is used")
      }else{

       bcrypt.hash(password,10).then(passwordCrypt=>{
        Manager.create({
         email:req.body.email,
         username:req.body.username,
         password:passwordCrypt})
         .then((result)=>res.status(200).json(result))
         .catch((err)=>res.status(400).json(err))
       })
      }
     }) 
    }
  }

    
 //-----------------------------------------

//afficher tout les managers
exports.getAll=async (req,res)=>{
  try{
   const data=await Manager.findAll()
    if(!data){
      res.status(400).json({error:"les managers sont introuvables !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//afficher une spec manager
exports.getId=async (req,res)=>{
 
  try{
   const data=await Manager.findOne({
                     where:{id:req.params.id}
                     });
       
    if(!data){
      res.status(400).json({error:"le manager est introuvable !"});
    }else{
      res.status(200).json(data);
    }
  }catch(err){
   res.status(400).json(err);
  }
}

//editer un manager
exports.Update=async (req,res)=>{

 try{
  const data=await  Manager.update({
                    email:req.body.email, 
                    username:req.body.username,
                    password:req.body.password, 
                    },{
                     where:{id:req.params.id}
                    })
      
    if(!data){
    res.status(400).json({message:"on peut pas editer manager!"});
    }else{
    res.status(200).json(data);
    }
    
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}

 
//delete influenceurs dans table temporaire
exports.Delete= async (req,res)=>{
 
 try{
  const data=await  Manager.destroy({
                     where:{id:req.params.id}
                      })
      
    if(!data){
    res.status(400).json({message:" on peut pas supprimer manager!"});
    }else{
    res.status(200).json(data);
    }

 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
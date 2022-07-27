
const {Manager}=require("../models");
const SchemaValidation=require("../validators/manager.validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION;

//-------------------------------------------------------------
//logout une influenceur;

//register un(e) influenceur
exports.register=async(req,res)=>{
  

     console.log(req.body);
     const {email,password,username}=req.body;
     let validation=SchemaValidation.validate({email,username,password})

     if(validation.error){
       res.json({validation:validation.error.details[0].message})
      }
      
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

    //login:
    //get by specific id
exports.Login=async (req,res)=>{
 
 try{
  var data=await Manager.findOne({
                    where:{email:req.body.email}
                    }); 
  data=data.dataValues;
  console.log(data);

  if(!data){
   res.json({message:"email not valid!"});
  
  }
  else{
     
     bcrypt.compare(req.body.password,data.password).then((same)=>{
      console.log(same);
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
    
 }catch(err){
    res.status(400).json({err:err});
 }
}
//logout influenceur:
exports.Logout = (req,res) =>{
  res.cookie('jwt','',{maxAge :1});
  //res.send("hello")
  res.redirect('/');
}
 //-----------------------------------------

//afficher tout les influenceurs dans table temporaire
exports.getAll=async (req,res)=>{
  try{
   const data=await Manager.findAll()
   if(!data){
    res.json({message:" introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json({err:err.errors[0].message});
  }
  
}


//get by specific id
exports.getId=async (req,res)=>{
 
  try{
   const data=await Manager.findOne({
                     where:{id:req.params.id}
                     });
       
   if(!data){
    res.json({message:" introuvable!"});
   }
    res.status(200).json(data);
  }catch(err){
   res.status(400).json(err);
  }
}

//update influenceur
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
   res.json({message:"not update!"});
  }
   res.status(200).json(data);
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
   res.json({message:" non supprimer!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
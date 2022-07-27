
const {Client}=require("../models");
const SchemaValidation=require("../validators/client.validator");


//-------------------------------------------------------------

//add client
exports.addClient=async(req,res)=>{
     
     console.log(req.body.telephone);
     const {nomSociete,pays,ville,quartier,codePostal,nomDirecteur,telephone,email,password}=req.body;
     let validation=SchemaValidation.validate({nomSociete,pays,ville,quartier,codePostal,nomDirecteur,telephone,email,password})

     if(validation.error){
       res.json({validation:validation.error.details[0].message})
      }
 
      try{

            const client= await Client.create({
                  nomSociete:nomSociete,
                  pays:pays,
                  ville:ville,
                  quartier:quartier,
                  codePostal:codePostal,
                  nomDirecteur:nomDirecteur,
                  telephone:telephone,
                  email:email,
                  password:password  
                 });

                  res.status(200).json(client);
       }catch(err){
                  res.status(200).json(err);
      }
  

    }

//getAll client:
exports.getAll=async (req,res)=>{
 
      try{
       const data=await Client.findAll();
           
       if(!data){
        res.json({message:"client introuvable!"});
       }
        res.status(200).json(data);
      }catch(err){
       res.status(400).json(err);
      }
    }
  
//get by specific id
exports.getId=async (req,res)=>{
 
  try{
      const data=await Client.findOne({
            where:{id:req.params.id}
      });
          
      if(!data){
       res.json({message:"client introuvable!"});
      }
       res.status(200).json(data);
     }catch(err){
      res.status(400).json(err);
     }
}

//update client
exports.Update=async (req,res)=>{

 try{
  const {nomSociete,pays,ville,quartier,codePostal,nomDirecteur,telephone,email,password}=req.body;
  const data=await  Client.update({
                        nomSociete:nomSociete,
                        pays:pays,
                        ville:ville,
                        quartier:quartier,
                        codePostal:codePostal,
                        nomDirecteur:nomDirecteur,
                        telephone:telephone,
                        email:email,
                        password:password 
                    },{
                     where:{id:req.params.id}
                    })
      
  if(!data){
   res.json({message:"client not update!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}


//delete client
exports.Delete= async (req,res)=>{
 
 try{ 
  const data=await  Client.destroy({
                     where:{id:req.params.id}
                      })
      
  if(!data){
   res.json({message:"client non supprimer!"});
  }
   res.status(200).json(data);
 }catch(err){
  res.status(400).json({err:err.errors[0].message});
 }
}
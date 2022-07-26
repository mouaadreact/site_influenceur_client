const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION; //env mieux
const {TemporaireInfluenceur}=require("../models");

module.exports.checkUser=async(req,res)=>{
 
  console.log("testing correct");
  const token=req.header("Authorization");
  if(token){
    const tokenData=jwt.verify(token,privateKey,async(err,decodedToken)=>{
          if(err){
            res.status(400).json({err:err});
          }else{

            console.log(decodedToken.email);
            const data=await TemporaireInfluenceur.findOne({where:{
                email:decodedToken.email
              }});
            res.status(200).send(data);
            // res.locals.user=user;
              
          }
    });
  }else{
         res.status(400).json({err:`token doesn't exist ! `})
         
  }
  

}
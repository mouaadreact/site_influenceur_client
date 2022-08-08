const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION; //env mieux
const {TemporaireInfluenceur, Manager}=require("../models");

module.exports.checkUser=async(req,res,next)=>{
 
  console.log("testing correct");
  const token=req.cookies.jwt;
  if(token){
    const tokenData=jwt.verify(token,privateKey,async(err,decodedToken)=>{
          if(err){
            res.locals.user=null;
            res.cookies('jwt','',{maxAge:1});
            next()
            //res.status(400).json({err:err});
          }else{

            //console.log(decodedToken.email);
            const user=await Manager.findOne({where:{
                email:decodedToken.email
              }});
            //res.status(200).send(data);
             res.locals.user=user; 
             next();
              
          }
    });
  }else{
         //res.status(400).json({err:`token doesn't exist ! `})
         res.locals.user=null;
         next();
  }
  

}



module.exports.requireAuth=async(req,res,next)=>{
 
  //console.log("testing correct");
  const token=req.cookies.jwt;
  if(token){
    const tokenData=jwt.verify(token,privateKey,async(err,decodedToken)=>{
          if(err){
            console.log(err)
          }else{
             next();         
          }
    });
  }else{
         console.log('no token')
         res.status(400).json({error:'no token'});
  }
  

}
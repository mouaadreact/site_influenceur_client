const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION; //env mieux
const {User, Role, Influenceur}=require("../models");
const axios=require("axios");
const fs=require("fs")
const FormatDate=require('../utils/formatDate');

module.exports.getAPI= async (req,res,next)=>{
    
 const token=req.cookies.jwt;
  if(token){
    const tokenData=jwt.verify(token,privateKey,async(err,decodedToken)=>{
          if(err){
           
          }else{
             //console.log(decodedToken);
             const user=await User.findOne({
              where:{
              id:decodedToken.id
              },
              include:[Role]
           });

           if(user.Role.dataValues.roleNom==="influenceur"){
                  //console.log(user)
                  //instagramUsernameCompte
                  let data=await Influenceur.findOne({
                                where:{UserId:decodedToken.id}
                              })
                    
                    data=data.dataValues;
                    

                    setInterval(async ()=>{
                    try { 
            
                     const options = {
                       method: 'GET',
                       url: `${process.env.INSTAGRAM_API_URL}`,
                       params: {user_name: `${data.instagramUsernameCompte}`},
                       headers: {
                         'X-RapidAPI-Key': `${process.env.INSTAGRAM_API_HEADER_KEY}`,
                         'X-RapidAPI-Host': `${process.env.INSTAGRAM_API_HEADER_HOST}`
                       }
                     };
                       
                        var UserApiInfo= await  axios.request(options);
                        var UserAPI = UserApiInfo.data.data.user;
                        if(!UserAPI){
                           console.log("on peut pas envoyer Instagram Info ! ");
                        }else{
                          var dir=`uploads/Api/${data.instagramUsernameCompte}`
                          if (!fs.existsSync(dir)){
                            fs.mkdirSync(dir); 
                          }
                          
                          fs.writeFile(`uploads/Api/${data.instagramUsernameCompte}/${data.instagramUsernameCompte}_${data.id}_${FormatDate(new Date())}.json`,JSON.stringify(UserAPI,null,2),err=>{
                             if(err){
                               console.log(err);
                             }else{
                               console.log("file add successful !! ")
                             }
                           });                      
                       }
         
                    }catch(err){
                       console.log(err);
                    }


                   
                     },1000*60*60*24);
             next();         
            }
         }
    });
  }else{
         console.log('no token Influenceur')
         res.status(400).json({error:'no token Influenceur'});
  }
  
}
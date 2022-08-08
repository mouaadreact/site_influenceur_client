const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const privateKey=process.env.PRIVATE_KEY_AUTHORIZATION;

module.exports.verifier=async (password,passwordCry,id,email,role)=>{

    const same=await bcrypt.compare(password,passwordCry);
      console.log(same);
      if(same){
        let token=jwt.sign({id:id,email:email,role:role},privateKey,{
        expiresIn:3*24*60*60*1000 });
        return token;
      }else{
      return null;
      }
  
}
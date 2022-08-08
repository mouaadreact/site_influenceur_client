const express=require("express");
const router=express.Router();
const AuthController=require("../controllers/auth.controller");
  

router.route("/logout") 
      .get(AuthController.logout);

 
router.route("/register")
       .post(AuthController.register);


router.route("/login")
      .post(AuthController.login)


module.exports=router;

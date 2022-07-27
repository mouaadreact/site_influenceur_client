const express=require("express");
const router=express.Router();
const ManagerController=require("../controllers/manager.controller");


router.route("/")
      .get(ManagerController.getAll)


router.route("/logout") 
      .get(ManagerController.Logout)  

router.route("/:id")
       .get(ManagerController.getId)
       .put(ManagerController.Update)
       .delete(ManagerController.Delete)

 
router.route("/register")
       .post(ManagerController.register)

router.route("/login")
      .post(ManagerController.Login)


module.exports=router;

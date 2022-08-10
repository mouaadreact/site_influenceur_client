const express=require("express");
const router=express.Router();
const UserController=require("../controllers/user.controller");


router.route("/")
      .get(UserController.getAll)
 

router.route("/:id")
       .get(UserController.getId)
       .put(UserController.update)
       .delete(UserController.delete)

router.route('/email')
      .get(UserController.getEmail)




module.exports=router;

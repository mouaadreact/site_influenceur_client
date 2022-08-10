const express=require("express");
const router=express.Router();
const RoleController=require("../controllers/role.controller");


router.route("/")
      .get(RoleController.getAll)
 

router.route("/:id")
       .get(RoleController.getId) 
       .put(RoleController.update)
       .delete(RoleController.delete)

 
router.route("/addRole")
       .post(RoleController.addRole)



module.exports=router;

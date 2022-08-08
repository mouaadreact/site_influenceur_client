const express=require("express");
const router=express.Router();
const ManagerController=require("../controllers/manager.controller");


router.route("/")
      .get(ManagerController.getAll)
 

router.route("/:id")
       .get(ManagerController.getId)
       .put(ManagerController.Update)
       .delete(ManagerController.Delete)

 
router.route("/addAdmin")
       .post(ManagerController.addAdmin)



module.exports=router;

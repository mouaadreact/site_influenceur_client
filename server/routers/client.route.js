const express=require("express");
const router=express.Router();
const clientController=require("../controllers/client.controller");


router.route("/")
      .get(clientController.getAll) 
      .post(clientController.addClient)
 
router.route("/:id")
       .get(clientController.getId)
       .put(clientController.Update)
       .delete(clientController.Delete)

 


module.exports=router;

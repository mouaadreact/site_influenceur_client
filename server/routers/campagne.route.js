const express=require("express");
const router=express.Router();
const campagneController=require("../controllers/campagne.controller");

 
router.route("/")
      .get(campagneController.getAll)
      .post( campagneController.addCampagne)

router.route("/:id")
       .get(campagneController.getId)
       .put(campagneController.update)
       .delete(campagneController.delete)

 

module.exports=router;

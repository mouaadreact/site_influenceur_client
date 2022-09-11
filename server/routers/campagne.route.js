const express=require("express");
const router=express.Router();
const campagneController=require("../controllers/campagne.controller");
 
 

router.route("/")
      .get(campagneController.getAll)
      .post( campagneController.addCampagne)

//filtrage:
router.route("/filtrage")
      .post(campagneController.filtrage);

router.route('/count')
      .get(campagneController.getCountAllCampagne)

router.route("/:id")
       .get(campagneController.getId)
       .put(campagneController.update)
       .delete(campagneController.delete)

 

module.exports=router;

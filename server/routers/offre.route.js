const express=require("express");
const router=express.Router();
const offreController=require("../controllers/offre.controller");


router.route('/')
      .get(offreController.getAll)

router.route('/oldOffre/:campagneId/:influenceurId')
     .get(offreController.oldOffre)

router.route('/accepterOffre/:campagneId/:influenceurId')
     .get(offreController.accepterOffre)

router.route('/:campagneId/:influenceurId')
      .post(offreController.addOffre)
      .get(offreController.getId)
      .put(offreController.update)
      .delete(offreController.delete)

module.exports=router;
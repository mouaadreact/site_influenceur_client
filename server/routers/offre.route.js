const express=require("express");
const router=express.Router();
const offreController=require("../controllers/offre.controller");


router.route('/')
      .get(offreController.getAll)
      .post(offreController.addOffre)

//*counter of all offre
router.route('/count')
      .get(offreController.getCountAllOffre)

// I will delete this route after execute front end
router.route('/newOffre/:influenceurId')
      .get(offreController.newOffre)


router.route('/campagne')
      .get(offreController.getAll)  

router.route('/data')
      .get(offreController.getData) 

router.route('/campagne/:campagneId')
     .get(offreController.getCampagneId)     

router.route('/offreAccepter/:influenceurId')
      .get(offreController.getOffreAccepterByInfluenceurId) 

router.route('/accepterOffre/:campagneId/:influenceurId')
      .put(offreController.accepterOffre)

router.route('/refuserOffre/:campagneId/:influenceurId')
     .put(offreController.refuserOffre)

router.route('/dontShowOffre/:campagneId/:influenceurId')
     .put(offreController.changeDontShow)

router.route('/:campagneId/:influenceurId')
      .get(offreController.getId)
      .put(offreController.update)
      .delete(offreController.delete)

module.exports=router;
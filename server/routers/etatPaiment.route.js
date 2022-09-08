const express=require("express");
const router=express.Router();
const etatPaimentController=require("../controllers/etatPaiment.controller");


router.route('/') 
      .get(etatPaimentController.getAll)
      .post(etatPaimentController.addEtatPaimentBody);

router.route('/campagne')
      .get(etatPaimentController.getAll)      

router.route('/campagne/:campagneId')
      .get(etatPaimentController.getIdCampagne)

router.route('/influenceur/:influenceurId')
      .get(etatPaimentController.getIdInfluenceur)



router.route('/:campagneId/:influenceurId')
      .get(etatPaimentController.getId)
      .put(etatPaimentController.update)
      .delete(etatPaimentController.delete)


module.exports=router;
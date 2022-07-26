const express=require("express");
const router=express.Router();
const interetInfluenceurController=require("../controllers/interetInfluenceur.controller");

 
router.route('/') 
      .get(interetInfluenceurController.getAll)
  
      
router.route('/interet/:interetId')
      .get(interetInfluenceurController.getIdInteret)

router.route('/influenceur/:influenceurId')
      .get(interetInfluenceurController.getIdInfluenceur)
      .delete(interetInfluenceurController.deleteInteretInfluenceur)

router.route('/:interetId/:influenceurId')
      .post(interetInfluenceurController.addInteretInfluenceur)
      .delete(interetInfluenceurController.delete)

router.route('/filtrageCentreInteret')
      .post(interetInfluenceurController.filtreParCentreInteret);

module.exports=router;
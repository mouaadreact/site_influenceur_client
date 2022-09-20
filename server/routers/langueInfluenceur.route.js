
const express=require("express");
const router=express.Router();
const langueInfluenceurController=require("../controllers/langueInfluenceur.controller");


router.route('/')
      .get(langueInfluenceurController.getAll)

       
router.route('/langue/:langueId')
      .get(langueInfluenceurController.getIdLangue)
 
router.route('/influenceur/:influenceurId')
      .get(langueInfluenceurController.getIdInfluenceur)
      .delete(langueInfluenceurController.deleteLangueInfluenceur)

router.route('/:langueId/:influenceurId')
      .post(langueInfluenceurController.addLangueInfluenceur)
      .delete(langueInfluenceurController.delete)



module.exports=router;
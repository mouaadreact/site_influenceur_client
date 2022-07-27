const express=require("express");
const router=express.Router();
const etatPaimentController=require("../controllers/etatPaiment.controller");


router.route('/')
      .get(etatPaimentController.getAll)

router.route('/:campagneId/:influenceurId')
      .post(etatPaimentController.addEtatPaiment)
      .get(etatPaimentController.getId)
      .put(etatPaimentController.update)
      .delete(etatPaimentController.delete)

module.exports=router;
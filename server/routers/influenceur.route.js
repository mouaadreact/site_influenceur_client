const express=require("express");
const router=express.Router();
const influenceurController=require("../controllers/influenceur.controller");

 
router.route("/")
      .get(influenceurController.getAll)

router.route("/confirmer-email")
      .get(influenceurController.validerCompte)

router.route("/:id")
       .get(influenceurController.getId)
       .put(influenceurController.update)
       .delete(influenceurController.delete)

router.route("/complete/:id")
       .put(influenceurController.completerProfil)
 

module.exports=router;

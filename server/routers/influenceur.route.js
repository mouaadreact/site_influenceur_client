const express=require("express");
const router=express.Router();
const influenceurController=require("../controllers/influenceur.controller");

 
router.route("/")
      .get(influenceurController.getAll)

router.route("/logout") 
      .get(influenceurController.logout)  


router.route("/confirmer-email")
      .get(influenceurController.validerCompte)

router.route("/:id")
       .get(influenceurController.getId)
       .put(influenceurController.update)
       .delete(influenceurController.delete)
       
router.route("/login")
       .post(influenceurController.login)

router.route("/valideCompte/:id")
       .put(influenceurController.valideCompteInstagram)

router.route("/complete/:id")
       .put(influenceurController.completerProfil)


module.exports=router;

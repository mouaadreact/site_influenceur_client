const express=require("express");
const router=express.Router();
const influenceurController=require("../controllers/influenceur.controller");

 
router.route("/")
      .get(influenceurController.getAll)


router.route('/count')
      .get(influenceurController.getCountAllInfluenceur)

//corfimer l'email pour allez vers l'etape 2
router.route("/confirmer-email")
      .get(influenceurController.validerCompteParEmail)

//filtrage:
router.route("/filtrage")
      .post(influenceurController.filtrage);

//active compte:
router.route("/activeCompte")
      .get(influenceurController.getAllInfluenceurActiveCompte);

router.route("/user/:id")
      .get(influenceurController.getByUserId);

//crud influenceur
router.route("/:id")
       .get(influenceurController.getId)
       .put(influenceurController.update)
       .delete(influenceurController.delete)


//valider compte instagram : API instagram utilisant rapiAPI 
router.route("/afficherCompte/:id")
       .put(influenceurController.afficherCompteInstagram)

//valider status compte instagram
router.route("/valideCompte/:id")
       .put(influenceurController.valideCompteInstagram)
       
//complete le compte Influenceur
router.route("/complete/:id")
       .put(influenceurController.completerProfil)

//accepter les conditions generales  
router.route("/accepterCondition/:id")
       .put(influenceurController.accepterConditionGenerale)


//activer/desactive le compte 
router.route("/changeEtatActiver/:id")
       .put(influenceurController.changeEtatActiveCompte)

//activer/desactive le compte 
router.route("/ajouterCommentaire/:id")
       .put(influenceurController.ajouterCommentaire)

module.exports=router;

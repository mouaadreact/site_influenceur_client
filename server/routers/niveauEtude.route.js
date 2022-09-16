const express=require("express");
const router=express.Router();
const NiveauEtudeController=require("../controllers/niveauEtude.controller");


router.route("/")
      .post(NiveauEtudeController.addNiveauEtude)
      .get(NiveauEtudeController.getAll)
 

router.route("/:id")
       .get(NiveauEtudeController.getId) 
       .put(NiveauEtudeController.update)
       .delete(NiveauEtudeController.delete)


module.exports=router;

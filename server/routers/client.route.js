const express=require("express");
const router=express.Router();
const clientController=require("../controllers/client.controller");


router.route("/") 
      .get(clientController.getAll) 
      .post(clientController.addClient)
  
router.route('/compteActive')
      .get(clientController.getAllActiveCompte)

router.route('/filterEtatActive')
      .get(clientController.getClientUsingStatusActive)

router.route('/count')
      .get(clientController.getCountAllClient)

//activer/desactive le compte 
router.route("/changeEtatActiver/:id")
       .put(clientController.changeEtatStatusActive)
      
router.route('/campagneCountOfClient')
      .get(clientController.getCountCampagneOfClient)
      
router.route("/:id")
       .get(clientController.getId)
       .put(clientController.Update)
       .delete(clientController.Delete)

 


module.exports=router;

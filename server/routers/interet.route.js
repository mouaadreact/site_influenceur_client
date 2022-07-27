const express=require("express");
const router=express.Router();
const interetController=require("../controllers/interet.controller")
router.route('/')
      .get(interetController.getAll)
      .post(interetController.addInteret)

router.route('/:id')
      .get(interetController.getId)
      .put(interetController.update)
      .delete(interetController.delete)


module.exports=router
const express=require("express");
const router=express.Router();
const langueController=require("../controllers/langue.controller")
router.route('/')
      .get(langueController.getAll)
      .post(langueController.addLangue)

router.route('/:id')
      .get(langueController.getId)
      .put(langueController.update)
      .delete(langueController.delete)


module.exports=router
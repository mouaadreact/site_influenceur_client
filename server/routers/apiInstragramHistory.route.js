const express=require("express");
const router=express.Router();
const ApiInstagramHistoryController=require("../controllers/apiInstagramHistory.controller") 

router.route("/")
      .get(ApiInstagramHistoryController.getAll)

router.route("/:influenceurId")
       .get(ApiInstagramHistoryController.getIdInfluenceur)


 

module.exports=router;

const express=require("express");
const router=express.Router();
const galerieCampagneController=require("../controllers/galerieCampagne.controller");
const multer=require("multer");
const path=require("path");

//id of element  
const storage=multer.diskStorage({
 destination:'./uploads/images/galerieCampagne',
 filename:(req,file,cb)=>{ //change date vers random
  return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }
})

//we need more options 
const upload=multer({
 storage:storage,
 /*limits: {
  fileSize: 3000
}*/
}) 

router.route("/") 
      .post(upload.array('images'),galerieCampagneController.upload)
      .get(galerieCampagneController.getAll);
 
router.route("/:campagneId")
      .get(galerieCampagneController.getId)
      .delete(galerieCampagneController.deleteGalerieCampagne)

module.exports=router;

const Joi=require("joi"); 

const SchemaValidation=Joi.object({
 email:Joi.string().email().required(),
 password:Joi.string().min(8).required()
}) 

module.exports=SchemaValidation;
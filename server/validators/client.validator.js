const Joi=require("joi"); 
 
const SchemaValidation=Joi.object({
 raisonSociale:Joi.string().alphanum().min(3).required(),
 pays:Joi.string().min(3).required(),
 ville:Joi.string().min(3).required(),
 quartier:Joi.string().min(3).required(),
 codePostal:Joi.number().integer().min(5),
 nomDirecteur:Joi.string().min(3).required(),
 telephone:Joi.string().required(),
 email:Joi.string().email().required()
}) 

module.exports=SchemaValidation;
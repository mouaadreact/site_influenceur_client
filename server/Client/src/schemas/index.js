import * as yup from "yup"

//const passwordRules=/[a-zA-Z1-9]{8,}/;
const yesterday = new Date(Date.now() -86400000);

export const basicSchemaRegister=yup.object().shape({
 username:yup.string().required("required").min(4,"more then 3 letter"),
 email:yup.string().email("Entrer valide email ! ").required("required"),
 password:yup.string().min(8,"minimum 8 character").required("required"),//.matches(passwordRules,{message:"entrer strong password"})
 confirmPassword:yup.string().oneOf([yup.ref('password'),null],'password must match').required('required')
});
//----------------------------------------
export const basicSchemaLogin=yup.object().shape({
 email:yup.string().email("Entrer valide email ! ").required("required"),
 password:yup.string().required("required"),
});
//----------------------------------------------
export const basicSchemaConfirmInstagram=yup.object().shape({
 nom:yup.string().required("required"),
 prenom:yup.string().required("required"),
 genre:yup.string().required("required"),
 dateNaissance:yup.date("date form invalid!").max(yesterday).required("required"),
 instagramUsernameCompte:yup.string().required("required"),
});

//--------------------------------------------
   export const basicSchemaCompleteProfil=yup.object().shape({
    pays: yup.string().required("required"),
    ville: yup.string().required("required"),
    quartier: yup.string().required("required"),
    situationFamiliale: yup.string().required("required"),
    nombreEnfant: yup.number().required("required"),
    niveauEtude: yup.string().required("required"),
    profession: yup.string().required("required"),
    LangueId: yup.number().required("required")
   });
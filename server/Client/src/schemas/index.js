import * as yup from "yup"

const passwordRules=/[a-zA-Z1-9]{8,}/;

export const basicSchemaRegister=yup.object().shape({
 username:yup.string().required("required").min(4,"more then 3 letter"),
 email:yup.string().email("Entrer valide email ! ").required("required"),
 password:yup.string().min(5).matches(passwordRules,{message:"entrer strong password"}).required("required"),
 confirmPassword:yup.string().oneOf([yup.ref('password'),null],'password must match').required('required')
});

export const basicSchemaLogin=yup.object().shape({
 email:yup.string().email("Entrer valide email ! ").required("required"),
 password:yup.string().required("required"),
});
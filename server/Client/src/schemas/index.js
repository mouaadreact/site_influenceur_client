import * as yup from "yup";

//const passwordRules=/[a-zA-Z1-9]{8,}/;
const yesterday = new Date(Date.now() - 86400000);

export const basicSchemaRegister = yup.object().shape({
  email: yup.string().email("Entrer valide email ! ").required("required"),
  password: yup.string().min(8, "minimum 8 character").required("required"), //.matches(passwordRules,{message:"entrer strong password"})
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("required"),
});
//----------------------------------------
export const basicSchemaLogin = yup.object().shape({
  email: yup.string().email("Entrer valide email ! ").required("required"),
  password: yup.string().required("required"),
});
//----------------------------------------------
export const basicSchemaConfirmInstagram = yup.object().shape({
  nom: yup.string().required("required"),
  prenom: yup.string().required("required"),
  genre: yup.string().required("required"),
  dateNaissance: yup
    .date("date form invalid!")
    .max(yesterday)
    .required("required"),
  facebookUsernameCompte: yup.string(),
  youtubeUsernameCompte: yup.string(),
  instagramUsernameCompte: yup.string().required("required"),
});

//--------------------------------------------
export const basicSchemaCompleteProfil = yup.object().shape({
  pays: yup.string().required("required"),
  ville: yup.string().required("required"),
  quartier: yup.string().required("required"),
  situationFamiliale: yup.string().required("required"),
  nombreEnfant: yup.number().required("required"),
  niveauEtude: yup.string().required("required"),
  profession: yup.string().required("required"),
});

//------------------------------
//Campagne Shema Basic
const hashtageRule = /^(#[a-zA-Z0-9]+,? *)*#[a-zA-Z0-9]+(\s)?$/gi;
const compteTaggeRule = /^(@[a-zA-Z0-9]+,? *)*@[a-zA-Z0-9]+(\s)?$/gi;

export const basicSchemaCampagne = yup.object().shape({
  titre: yup.string().required("required"),
  dateDebut: yup
    .date("date form invalid!")
    .min(new Date(), "Please choose future date")
    .required("required"),
  dateFin: yup
    .date("date form invalid!")
    .when("dateDebut", (dateDebut, schema) => {
      if (dateDebut) {
        const dayAfter = new Date(dateDebut.getTime() + 86400000);

        return schema.min(dayAfter, "End date has to be after than start date");
      }

      return schema;
    })
    .required("required"),
  presence: yup.boolean("doit etre oui/non").required("required"),
  nombreInfluenceur: yup.number().required("required"),
  descriptionOffre: yup.string().required("required"),
  hashtags: yup
    .string()
    .matches(hashtageRule, "hashtage only have forma #hashtage #hashtage")
    .required("required"),
  compteTagger: yup
    .string()
    .matches(compteTaggeRule, "compate Tagger have only forma @compte @compte")
    .required("required"),
  ClientId: yup.number().required("required"),
});

export const basicSchemaCampagneUpdate = yup.object().shape({
  titre: yup.string(),
  dateDebut: yup.date("date form invalid!"),
  dateFin: yup.date("date form invalid!"),
  presence: yup.boolean("doit etre oui/non"),
  nombreInfluenceur: yup.number(),
  descriptionOffre: yup.string(),
  hashtags: yup
    .string()
    .matches(hashtageRule, "hashtage only have forma #hashtage #hashtage"),
  compteTagger: yup
    .string()
    .matches(compteTaggeRule, "compate Tagger have only forma @compte @compte"),
  ClientId: yup.number(),
});

//!---------------------------------------------------------

export const basicSchemaChangePasswordProfil = yup.object().shape({
  newPassword: yup.string().min(8, "minimum 8 character").required("required"), //.matches(passwordRules,{message:"entrer strong password"})
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "password must match")
    .required("required"),
});

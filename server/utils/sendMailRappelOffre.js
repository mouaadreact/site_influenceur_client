const nodemailer=require("nodemailer") 
 
//send verifier email
module.exports.SendRappel= async (mails,subject,text)=>{
 //code verification iujypqrgtevjdltp

 let transporter=nodemailer.createTransport({
     host: 'smtp.gmail.com', //error
     port: 465, //error
     secure: true, //error
     auth:{  //add une email pour access 
         user:"influenceur.client.mail2022@gmail.com", //influenceur.client.mail2022@gmail.com
         pass:"azbvktbknbjfvnbl"//3wdev2022
     } 
  })

  //loop
 
  try {
   const mailerPromises = mails.map((mail) => transporter.sendMail({
    form:"influenceur.client.mail2022@gmail.com",
    to:mail,
    subject:`
    Message from email : influenceur.client.mail2022@gmail.com , 
    subject :Rappel Offre ${subject}`,
    "text":` 
       vous avez deja offre : ${text} check your account in plateforme http://localhost:3000/profil/newOffre pour faire les operations à cette offre.
    `
}));
   const responses = await Promise.all(mailerPromises);
   console.log(responses, "All Mails Have Been Sent Successfully");
 } catch (e) {
   console.log(e);
 }


}


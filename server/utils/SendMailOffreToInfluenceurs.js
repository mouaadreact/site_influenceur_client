const nodemailer=require("nodemailer") 
 
//send verifier email
module.exports.SendOffre= async (mails,subject,text)=>{
 //code verification iujypqrgtevjdltp

 let transporter=nodemailer.createTransport({
     host: 'smtp.gmail.com', //error
     port: 465, //error
     secure: true, //error
     auth:{  //add une email pour access 
         user:"influenceur.client.mail2022@gmail.com", //influenceur.client.mail2022@gmail.com
         pass:"azbvktbknbjfvnbl"//3wdev2022
     } 
  })//.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()


  //loop
 
  try {
   const mailerPromises = mails.map((mail) => transporter.sendMail({
    form:"influenceur.client.mail2022@gmail.com",
    to:mail.email,
    subject:`
    Message from email : influenceur.client.mail2022@gmail.com , 
    subject : ${subject}`,
    "text":` 
       ${text}
    `
}));
   const responses = await Promise.all(mailerPromises);
   console.log(responses, "All Mails Have Been Sent Successfully");
 } catch (e) {
   console.log(e);
 }


}

/*

Promise.all([
  transporter.sendMail(mailOptions),
  transporter.sendMail(mailOptions2),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

*/
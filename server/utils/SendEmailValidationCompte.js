const nodemailer=require("nodemailer") 

//send verifier email
module.exports.ContactUs=(email,url)=>{
 console.log(url+" --> "+email);
 //code verification iujypqrgtevjdltp

 let transporter=nodemailer.createTransport({
     host: 'smtp.gmail.com', //error
     port: 465, //error
     secure: true, //error
     auth:{  //add une email pour access 
         user:"influenceur.client.mail2022@gmail.com", //influenceur.client.mail2022@gmail.com
         pass:"3wdev2022"//3wdev2022
     }
  })//.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

  let mailOptions={
      form:email,
      to:"influenceur.client.mail2022@gmail.com",
      subject:`
      Message from email : ${email} , 
      subject : 
        comfirmer votre email`,
      "text":` 
        click ici : ${url}
      `
  };

  transporter.sendMail(mailOptions,(err,success)=>{
      if(err) {
         console.log(err);
      }
      else {
         console.log("Email send successfully ");
      }
  });
}
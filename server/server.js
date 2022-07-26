//--models utilise on projet
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const db=require("./config/db");
const models=require("./models")
require("dotenv").config();
const cookieParser = require('cookie-parser');
const ig=require("instagram-scraping");

//route require:
const ClientRoute=require("./routers/client.route");
const TemporaireInfluenceurRoute=require("./routers/temporaireInfluenceur.route")
const Authorization=require("./middlewares/auth.middelware");
 

//--variables 
const PORT=process.env.PORT || 3000;
process.setMaxListeners(0)
//--configurer pour lire les donnes envoyent par les formulaires 
//--formuler post request (json or urlencoded)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())
//--connect to database


//-----Associations

//---routing 
//check if user have privilage to access at information 
app.post('/api/v1/token',Authorization.checkUser);
//temporaireTable influenceur
app.use('/api/v1/temporaireInfluenceur',TemporaireInfluenceurRoute);

//------------------------------------------
//instagrma api for testing api instagram
//api
//https://www.instagram.com/leomessi/?__a=1&__d=dis
//--------------------------

//test connection
db.authenticate()
  .then(()=>{
    console.log("Connection has been established successfully.")
  })
  .catch(err=>{
    console.error("Unable to connect to the database",err)
  })


/*db.sequelize.sync({force:false}).then(()=>{
 console.log("Tables Created ! ");
})*/
 app.listen(PORT,()=>console.log(`server run in http://localhost:${PORT}`))


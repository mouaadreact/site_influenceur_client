//--models utilise on projet
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const db=require("./config/db");
const models=require("./models")
require("dotenv").config();
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const morgan = require('morgan')
const cors=require("cors");

//route require:


const ClientRoute=require("./routers/client.route");
const InteretRoute=require("./routers/interet.route");
const LangueRoute=require("./routers/langue.route");
const InfluenceurRoute=require("./routers/influenceur.route");
const CampagneRoute=require("./routers/campagne.route");
const OffreRoute=require("./routers/offre.route");
const EtatPaimentRoute=require("./routers/etatPaiment.route");
const InteretInfleunceurRoute=require("./routers/interetInfluenceur.route");
const LangueInfluenceurRoute=require("./routers/langueInfluenceur.route");
const InteretCampagneRoute=require("./routers/interetCampagne.route");
const GalerieCampagneRoute=require("./routers/galerieCampagne.route");
const UserRoute=require("./routers/user.route");
const RoleRoute=require("./routers/role.route");
const AuthRoute=require("./routers/auth.route");
//utils route:
const CountriesRoute=require("./utils/addresses");
//route of influenceur:
//authorization
const {requireAuth,checkUser}=require("./middlewares/auth.middelware");
 

//--variables 
const PORT=process.env.PORT || 5000;
process.setMaxListeners(0);
//--configurer pour lire les donnes envoyent par les formulaires 
//--formuler post request (json or urlencoded)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  origin:process.env.URL_CLIENT,
  credentials :true,

}
app.use(cors(corsOptions));
//security header of request
//app.use(helmet());
if(process.env.NODE_ENV=='development'){
  app.use(morgan('tiny'));
}
//--connect to database

 
//-----Associations

//---routing 
//check if user have privilage to access at information 
app.get("*",checkUser);
//-----
// function 24h get Json file of API instagram and all username of influenceurs
app.get('*',(req,res,next)=>{
  //console.log('Mouaad')
  next() 
});
//-----------------
app.get('/jwtid',requireAuth,(req,res)=>{
  console.log(res.locals.user.id);
  res.status(200).json({id:res.locals.user.id});
});

//app function route
//--------------------
app.use('/api/v1/profile/:id', express.static('uploads/galerieCampagne'));
app.use('/api/v1/client',ClientRoute);
app.use('/api/v1/interet',InteretRoute);
app.use('/api/v1/langue',LangueRoute);
app.use('/api/v1/influenceur',InfluenceurRoute);
app.use('/api/v1/campagne',CampagneRoute);
app.use('/api/v1/offre',OffreRoute);
app.use('/api/v1/etatPaiment',EtatPaimentRoute);
app.use('/api/v1/interetInfluenceur',InteretInfleunceurRoute);
app.use('/api/v1/langueInfluenceur',LangueInfluenceurRoute);
app.use('/api/v1/interetCampagne',InteretCampagneRoute);
app.use('/api/v1/galerieCampagne',GalerieCampagneRoute); 
//-----
app.use('/api/v1/user',UserRoute);
app.use('/api/v1/role',RoleRoute);
app.use('/api/v1/auth',AuthRoute);

//utils route
app.get('/api/v1/countries',CountriesRoute.getCountries);
app.get('/api/v1/cities',CountriesRoute.getCities);

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


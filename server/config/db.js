
const sequelize=require("sequelize");
const env=process.env.NODE_ENV || 'development';
const config=require("./config")[env];
 
module.exports=new sequelize( 
    config.database,
    config.username,
    config.password,
    config
);

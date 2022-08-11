const fs=require('fs');

exports.getCountries=(req,res)=>{

 fs.readFile('./uploads/Adresses/Country/countries.json','utf-8',(err,jsonString)=>{
  if(err){
    console.log(err);
  }else{
    try{
     const data=JSON.parse(jsonString);
     console.log(data);
     res.status(200).json(data);
    }catch(err){
      console.log('error parsing JSON',err);
      res.status(400).json(err);
    }
  }
 })

}


export default function isAuth(){
 if(localStorage.jwt){
  return {status:true,role:localStorage.role}
 }else{
  return {status:false}
 }
}
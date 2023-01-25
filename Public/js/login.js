import axios from "axios";
import { Alert } from "./alert";

export const login=async function(userData){
   try {
     const response=await axios({
        method:'POST',
        url:"http://localhost:7000/api/v1/user/login",
        data:userData
     })
     Alert('success','Login successfull')
     setTimeout(() => {
        location.href="/"
     },2500);
   } catch (error) {
    console.log(error);
      Alert('error','Invalid email and password')
   }
}
export const logout =async function(){
   try {
      const response= await axios({
         method:'POST',
         url:"http://localhost:7000/api/v1/user/logout",
      })
      if(response.status===200){
         Alert('success','Logout success')
         console.log(response);
         setTimeout(() => {
            location.href='/'
         }, 1500);
      }

   } catch (error) {
      console.log(error);
      Alert('error','Invalid email and password')
   }
}
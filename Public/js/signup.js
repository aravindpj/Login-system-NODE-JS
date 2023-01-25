import axios from "axios";
import { Alert } from "./alert";
export const Signup=async function(userData){
    try {
        const response=await axios({
            method:'POST',
            url:'http://localhost:7000/api/v1/user/signup',
            data:userData
        })
      console.log(response.data.status);
      Alert("success","Your Account created")
      setTimeout(() => {
         location.href='/'
      }, 2000);
    } catch (error) {
        Alert("error","Validation error")
        
          
    }
} 
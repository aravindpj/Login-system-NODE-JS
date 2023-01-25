import axios from "axios"
import { Alert } from "./alert";

export const forgotPassword=async function(email){
    try {
        const response=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/user/forgotpassword`,
            data:{
                email
            }
        })
        
        Alert('success',`${response.data.message}`)
        setTimeout(() => {
            location.href='/resetpassword'
        }, 2000);
    } catch (error) {
        Alert('error',`${error.response.data.message}`)
    }
}

export const resetPassword=async function(token,password,confirmpassword){
    try {
        const response=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/user/resetpassword`,
            data:{
                token,
                password,
                confirmpassword
            }
        })
        Alert('success',`${response.data.message}`)
        setTimeout(() => {
            location.href='/'
        },2000);
    } catch (error) {
        console.log(error);
        Alert('error',`${error.response.data.message}`)
    }
}
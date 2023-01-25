import '@babel/polyfill'

import { login ,logout} from './login'
import { forgotPassword, resetPassword } from './passwordReset'
import { Signup } from './signup'

const LoginEmail=document.querySelector('.login-email')
const LoginPassword=document.querySelector('.login-password')
const Login=document.querySelector('.login')
const Signupbtn=document.querySelector('.signup-btn')
const Logout=document.querySelector('.logout')
const forgotpassForm=document.querySelector('.forgot-pass-form')
const resetpassword=document.querySelector('.reset-pass-form')
/////////////////////////

if(Login){
    Login.addEventListener('click',async function(){
        const email=LoginEmail.value
        const password=LoginPassword.value
        console.log(email,password);
        console.log('form click');
        await login({email,password})
    })
}
if(Signupbtn){
    Signupbtn.addEventListener('click', async function(){
        const email=document.querySelector('.signup-email').value
        const name=document.querySelector('.signup-name').value
        const password=document.querySelector('.signup-password').value
        const confirmpassword=document.querySelector('.signup-confirmpassword').value 
        await Signup({email,name,password,confirmpassword})
    })
}
if(Logout){
    Logout.addEventListener('click',async function(){
        console.log('click');
        await logout()
    })
}
if(forgotpassForm){
    forgotpassForm.addEventListener('submit',async function(e){
      e.preventDefault()
      const email=document.querySelector('.forgot-email-field').value
      console.log(email);
      await forgotPassword(email)
    })
}
if(resetpassword){
    resetpassword.addEventListener('submit',async function(e){
       e.preventDefault()
       let token=document.getElementById('token').value
       let password =document.getElementById('password').value
       let confirmpassword=document.getElementById('confirmpassword').value
       await resetPassword(token,password,confirmpassword)
    })
}
// if(UploadUserProfile){
//     UploadUserProfile.addEventListener('submit',async function(e){
//          e.preventDefault() 
//         const photo=document.getElementById('photo').files[0]
//         console.log(photo);
//         await uploadProfile(photo)
//     })
// }
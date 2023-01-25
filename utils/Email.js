const nodemailer=require('nodemailer')
class Email{
    constructor(user,text){
        this.to=user.email
        this.from=`loginsystemapp@example.io`
        this.text=text
    }
    newTransport(){
        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b3d64dd3366315",
              pass: "4a2ca8760be96b"
            }
        })
    }
    async send(subject){
       let  myOptions={
         from:this.from,
         to:this.to,
         subject,
         text:`Token:${this.text}`
       }
       await this.newTransport().sendMail(myOptions)
    }
    async forgotPassword(){
        await this.send('Your Token will expire within 10 minutes !')
    }
}

module.exports=Email

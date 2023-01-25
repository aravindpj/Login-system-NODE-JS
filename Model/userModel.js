const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter your name'],
        minLength: 10
    },
    email:{
      type:String,
      required:[true,'Enter your email'],
      unique:true
    },
    password:{
        type:String,
        required:[true,'Enter your password'],
        minLength: 10,
        select:false
    },
    confirmpassword:{
        type:String,
        validate:{
            validator:function(val){
                return this.password===val
            },
            message:'The password is not correct'
        }
    },
    passwordCreatedAt:Date,
    profile:{
        type:String,
        default:'default.jpg'
    },
    passwordResetToken:String,
    passwordResetTokenExpire:String
})

userSchema.pre('save',function(next){
     //*) chech if password modified if its not return to next middleware
     if(!this.isModified('password') || this.isNew) return next()

     this.passwordCreatedAt=Date.now()-1000
     next()
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,12)
    this.confirmpassword=undefined
    next()
})

userSchema.methods.passwordIscorrect=async function(currentPassword,userPassword){
   return await bcrypt.compare(currentPassword,userPassword)
}
userSchema.methods.checkPasswordCreatedAt=function(JWTtimestamp){
    if(this.passwordCreatedAt){
        let passwordCreatedAt=parseInt(this.passwordCreatedAt.getTime()/1000)
        return JWTtimestamp < passwordCreatedAt
    }
   return false
}

userSchema.methods.ResetToken=function(){
     const resetToken=crypto.randomBytes(5).toString('hex')
     this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
     this.passwordResetTokenExpire=Date.now()+10*60*1000
     return resetToken
}


const User=mongoose.model('User',userSchema)
module.exports=User
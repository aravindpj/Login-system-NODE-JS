const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../Model/userModel");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const Email = require("../utils/Email");
const crypto=require('crypto')

const createToken = function (id) {
  return jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: process.env.EXPIRE,
  });
};

const sendResponse = (user, sattusCode, res, needToken) => {
  let token;
  if (needToken) {
    token = createToken(user._id);
    let options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60),
      httpOnly: true,
    };
    res.cookie("jwt", token, options);
  }

  user.password = undefined;
  res.status(sattusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.Signup = catchAsync(async (req, res, next) => {
  const NewUser = await User.create(req.body);
  sendResponse(NewUser, 201, res, false);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1)check email and password
  if (!email || !password)
    return next(new AppError(`please provide user email and password `, 404));

  //2) get user from data base
  const user = await User.findOne({ email }).select("+password");

  //3)check if user are exists and user password are correct
  if (!user || !(await user.passwordIscorrect(password, user.password)))
    return next(new AppError(`Invalid user and password `, 404));

  //4) create jwt Token send response to the client
  sendResponse(user, 200, res, true);
});

exports.logout=(req,res,next)=>{
     let options={
       expires:new Date(Date.now()+10*1000),
       httpOnly:true
     }
     res.cookie('jwt','logout',options)
    sendResponse('',200,res,false)
}

exports.isLoggedIn = async (req, res, next) => {
  try {
    
    //1) check if token is there
    const { jwt: token } = req.cookies;
    if (!token) return next();

    //2) verify the JWT token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRETKEY);
    const user = await User.findById(decoded.id);
    if (!user) return next();

    //3) check if the is user updated password after token was created
    if(user.checkPasswordCreatedAt(decoded.iat)){
      return next()
    }
    
    req.user=user
  } catch (error) {
    return next();
  }

  next();
};

exports.forgottenpassword=async (req,res,next)=>{
  const {email}=req.body
  //1) check email id is theee
  if(!email) return next(new AppError(`please enter your email id`,404))
  //2) find user this email id 
  const user=await User.findOne({email})
  if(!user) return next(new AppError(`The user no longer exist`,404))
  //3) genertae reset token
  const resetToken=user.ResetToken()
  await user.save()
  //4) send mail 
  try {
    new Email(user,resetToken).forgotPassword()
    res.status(200)
    .json({
      status:"success",
      message:"check your email inbox"
    })
  } catch (error) {
     user.passwordResetToken=undefined
     user.passwordResetTokenExpire=undefined
     await user.save()
     next(new AppError(`something went wrong`,500))
  }
 
}

exports.resetPassword=catchAsync(async (req,res,next)=>{

   console.log(req.body);
  const {token,password,confirmpassword}=req.body

     if(!token || !password || !confirmpassword) return next(new AppError(`we are sorry please enter details`,404))

     const hashedToken=crypto.createHash('sha256').update(token).digest('hex')
     
     const user=await User.findOne({passwordResetToken:hashedToken,passwordResetTokenExpire:{$gte:Date.now()}})
      if(!user) return next(new AppError(`We are sorry Your token is expired `,404))
      //update user password and remove token,token expire date from database
      user.password=password
      user.confirmpassword=confirmpassword
      user.passwordResetToken=undefined
      user.passwordResetTokenExpire=undefined
      await user.save()
     res.status(200)
     .json({
      status:"successs",
      message:"your password is updated "
     })
})
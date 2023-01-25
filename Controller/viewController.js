
exports.LoginWindow=(req,res,next)=>{
    res.status(200)
    .render('login')
}

exports.SignupWindow=(req,res,next)=>{
    res.status(200)
    .render('register')
}
exports.getMe=(req,res,next)=>{
    if(!req.user) next()
    res.locals.user=req.user
    res.status(200)
    .render('profile')
}
exports.redirectAccount=(req,res,next)=>{
    res.redirect('/')
}

exports.forgotPassword=(req,res,next)=>{
    res.status(200)
    .render('forgotpassword')
}

exports.resetpassword=(req,res,next)=>{
    res.status(200)
    .render('resetpassword')
}
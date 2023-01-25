
const sendErrorResponse=(err,res)=>{
    res.status(err.statusCode)
    .json({
        status:err.status,
        Error:err,
        message:err.message,
        stack:err.stack
    })
}

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode  || 500
    err.status=err.status || 'Error'
    sendErrorResponse(err,res)
}
class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this.status=`${statusCode}`.startsWith('4') ? 'Fail' : 'Error',
        this.statusCode=statusCode || 500
        Error.captureStackTrace(this.constructor)
    }
}

module.exports=AppError
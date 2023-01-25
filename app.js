const express=require('express')
const app=express()
const path=require('path')
const userRouter=require('./Router/userRouter')
const viewRouter=require('./Router/viewRouter')
const globalError=require('./Controller/errorController')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const cors=require('cors')

app.use(express.static(path.join(__dirname,'Public')))
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.use(cors())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(cookieParser())

app.use('/',viewRouter)

app.use('/api/v1/user',userRouter)

app.use(globalError)

module.exports=app
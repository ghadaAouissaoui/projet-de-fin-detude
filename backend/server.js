const express=require("express")
const colors=require('colors')
const { errorHandler } = require("../backend/src/middleware/errorMiddleware")
const connectDB=require('./src/config/db')
const dotenv=require("dotenv").config()
const cors = require('cors');
const port = process.env.PORT || 5000

connectDB()

const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/veterinary', require('./src/routes/veterinaryRoutes'))
app.use('/api/veto/secretaire', require('./src/routes/secretaireRoutes'))


app.use(errorHandler)

app.listen(port,()=>console.log (`server stated on port ${ port }`))


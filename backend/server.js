const express=require("express")
const colors=require('colors')
const { errorHandler } = require("../backend/src/middleware/errorMiddleware")
const connectDB=require('./src/config/db')
const dotenv=require("dotenv").config()
const cors = require('cors');
const path = require('path');

const { protect } = require("./src/middleware/authmiddleware")
const port = process.env.PORT || 5000

connectDB()

const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false }))
// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/veterinaries', require('./src/routes/veterinaryRoutes'))
app.use('/api/veto/secretaire', require('./src/routes/secretaireRoutes'))
app.use('/api/treatment',protect, require('./src/routes/treatmentRoutes'))
app.use('/api/appointment', require('./src/routes/appointmentRoutes'))
app.use('/api/pet', require('./src/routes/petsRoutes'))
app.use('/api/messages', require('./src/routes/messageRoutes'))
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/espaceclient/predict', require('./src/routes/predictionRoutes'));
app.use(errorHandler)

app.listen(port,()=>console.log (`server stated on port ${ port }`))


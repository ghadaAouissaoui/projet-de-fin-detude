const mongoose = require('mongoose')

const veterinarySchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    specialite: {
        type: String,
        required: true,
    },
    address: {
        
            type: String,
            required: true,
       
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    verified: { 
        type: Boolean, 
        default: false ,// Le veterinaire n'est pas vérifié par défaut
    },
    role: {
        type: String,
        enum: ['veterinaire', 'administrateur'], // Définissez les rôles disponibles
        default: 'veterinaire' // Définissez le rôle par défaut
    }
      }, 
{
    timestamps: true,
})

module.exports = mongoose.model('Veterinary', veterinarySchema)

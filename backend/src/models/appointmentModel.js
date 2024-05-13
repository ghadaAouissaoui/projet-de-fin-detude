const mongoose = require('mongoose');
const moment = require('moment');

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    treatments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    }],
    appointment_date: {
        type: String, // Stocker la date sous forme de chaîne de caractères pour le formatage personnalisé
        required: true,
    },
    appointment_time: {
        type: String,
        required: true,
    },

    reason: String,
    
    veterinaire:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinary'
    },
    duration: {
        type: String,
        validate: {
            validator: function(v) {
                const duration = parseInt(v, 10);
                return !isNaN(duration) && duration >= 15 && duration <= 240;
            },
            message: props => `${props.value} is not a valid duration. It should be between 15 and 240 minutes.`
        }
    },
    
    status: {
        type: String,
        default: 'available'
    }
});

// Middleware pour formater la date et l'heure avant la sauvegarde
appointmentSchema.pre('save', function(next) {
    // Formater la date au format MM/DD/YYYY
    this.appointment_date = moment(this.appointment_date).format('MM/DD/YYYY');
    // Laisser l'heure telle quelle
    // Formater l'heure au format hh:mm aa
    const timeFormatted = moment(this.appointment_time, 'HH:mm').format('hh:mm A');
    this.appointment_time = timeFormatted;
    next();
});

// Create appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

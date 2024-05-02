const mongoose = require('mongoose');

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
    pet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pet",
        required:true
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
        type: String,
        required: true,
    },
    appointment_time: {
        type: String,
        required: true,
    },
    reason: String,
    veterinaire:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veterinary'
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

// Create appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

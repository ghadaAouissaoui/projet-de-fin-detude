const mongoose = require('mongoose');

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
    appointment_date: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{4}-\d{2}-\d{2}/.test(v);
            },
            message: props => `${props.value} is not a valid date format (YYYY-MM-DD)!`
        }
    },
    appointment_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:MM)!`
        }
    },
    description: String,
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

const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: props => `${props.value} is not a valid date!`
        }
    },
    species: String,
    breed: String,
    sex: String,
    profilePicture: String,
    comments: String,
    medicalHistory: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'// Assuming your user model is named 'User'
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
},{
    timestamps:true,
});


const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

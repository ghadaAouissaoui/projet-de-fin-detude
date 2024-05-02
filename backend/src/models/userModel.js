const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        // You may want to add additional validation rules here
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // Adding email validation
        match: /^\S+@\S+\.\S+$/,
    },
    datebirth: {
        type: Date,
        required: true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
        // You may want to add password complexity validation here
    },
    confirmpassword: {
        type: String,
        required: true,
        // Validation to ensure it matches the password field
        validate: {
            validator: function(value) {
                return this.password === value;
            },
            message: 'Password confirmation does not match.',
        },
    },
    verified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'veterinaire', 'user'],
        required: true,
        validate: {
            validator: function(value) {
                return ['admin', 'veterinaire', 'user'].includes(value);
            },
            message: 'Valid role only admin, personnel, or user',
        },
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinary'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

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
        // You may want to add email validation here
    },
    datebirth: {
        type: Date,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
        // You may want to add password complexity validation here
    },
    confirmpassword: {
        type: String,
        required: true,
        // You may want to add validation to ensure it matches the password field
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

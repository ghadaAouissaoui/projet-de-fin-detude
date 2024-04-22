const mongoose = require('mongoose');

const veterinarySchema = mongoose.Schema(
    {
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
        specialite: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        datebirth: {
            type: Date,
            required: true,
            validate: {
                validator: function(value) {
                    return value instanceof Date && !isNaN(value);
                },
                message: props => `${props.value} is not a valid date!`
            }
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmpassword: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return value === this.password;
                },
                message: props => `Passwords do not match!`
            }
        },
        role: {
            type: String,
            enum: ['veterinaire', 'administrateur'],
            default: 'veterinaire'
        },
        verified: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Veterinary', veterinarySchema);

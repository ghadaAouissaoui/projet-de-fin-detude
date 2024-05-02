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
            type: {
                rue: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                postalCode: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        nomCabinet: {
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
            validate: {
                validator: function(v) {
                    return v.length <= 15;
                },
                message: props => `${props.value} exceeds the maximum length of 15 characters!`
            }
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
       
        

        profile_picture: String,
        description:String,

        verified: {
            type: Boolean,
            default: false
        },
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Veterinary', veterinarySchema);

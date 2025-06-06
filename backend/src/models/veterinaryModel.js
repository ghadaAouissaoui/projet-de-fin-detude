const mongoose = require('mongoose');

// Schéma pour l'expérience du vétérinaire
const experienceSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String }
});

// Schéma principal du vétérinaire
const veterinarySchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true, match: /^\S+@\S+\.\S+$/ },
    specialite: { type: String, required: true },
    address: {
        type: {
            rue: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true }
        },
        required: true
    },
    nomCabinet: { type: String, required: true },
    experience: [experienceSchema], // Utilisation du schéma d'expérience défini ci-dessus
    datebirth: { type: Date, required: true, validate: {
        validator: function(value) {
            return value instanceof Date && !isNaN(value);
        },
        message: props => `${props.value} is not a valid date!`
    }},
    phoneNumber: { type: String, validate: {
        validator: function(v) {
            return v.length <= 15;
        },
        message: props => `${props.value} exceeds the maximum length of 15 characters!`
    }},
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true, validate: {
        validator: function(value) {
            return value === this.password;
        },
        message: props => `Passwords do not match!`
    }},
    role: { type: String, enum: ['veterinaire', 'administrateur'], default: 'veterinaire' },
    profilePhoto: String,
    description: String,
    verified: { type: Boolean, default: false },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    secretaires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Secretaire' }]
}, { timestamps: true });

module.exports = mongoose.model('Veterinary', veterinarySchema);

// Import de mongoose
const mongoose = require('mongoose');

// Schéma pour enregistrer les jours et heures disponibles du vétérinaire
const veterinaryAvailabilitySchema = new mongoose.Schema({
    vetId: {
        type: mongoose.Schema.Types.ObjectId, // Référence vers l'ID du vétérinaire
        required: true
    },
    availability: {
        type: Array, // Tableau des jours et heures disponibles
        required: true
    }
});

// Création du modèle VeterinaryAvailability à partir du schéma
const VeterinaryAvailability = mongoose.model('VeterinaryAvailability', veterinaryAvailabilitySchema);

module.exports = VeterinaryAvailability;

const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema(
   {
        ownerName:String,
        ownerEmail:String,
        petName:String,
        petSpecies:String,
        vaccines: {
                vaccineName: String,
                vaccineDate: Date
            },
        medicationName:String,
        allergies: String,
        // Ajout de l'objet obligatoire medicalTreatments
        medicalTreatments: {
            type: {
                treatmentName: String,
                dateTreatment: {
                    type: Date,
                    default: Date.now // Configurer la date par défaut comme la date actuelle lors de la création
                },
                notes: String
            },
            required: true
        },
        vetNotes: {
            Type:String
        }, 
    },
    { timestamps: true } // Utilisation des horodatages pour enregistrer la date de création et de mise à jour
);

module.exports = mongoose.model('Treatment', treatmentSchema);

const Treatment = require('../models/treatmentModel');
const Appointment =require('../models/appointmentModel')



async function getAllTreatments(req, res) {
    try {
        const treatments = await Treatment.find(req.query);
        if (treatments.length > 0) {
            return res.status(200).json(treatments);
        } else {
            return res.status(404).send('No treatments found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getOneTreatment(req, res) {
    try {
        const treatment = await Treatment.findById(req.params.treatmentId);
        if (treatment) {
            return res.status(200).json(treatment);
        } else {
            return res.status(404).send('Treatment not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



async function createTreatment(req, res) {
    try {
        // Vérifier si l'ID du rendez-vous est fourni dans la requête
        const { appointmentId } = req.body;
        if (!appointmentId) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        // Vérifier si le rendez-vous existe
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Créer le traitement
        const treatment = await Treatment.create(req.body);

        // Récupérer l'ID du traitement créé
        const treatmentId = treatment._id;

        // Associer le traitement au rendez-vous en ajoutant son ID à la liste des traitements du rendez-vous
        await Appointment.findByIdAndUpdate(appointmentId, { $push: { treatments: treatmentId } });

        return res.status(200).json({ message: 'Treatment created', treatment });
    } catch (error) {
        // Si une erreur se produit lors de la création du traitement, gérer l'erreur
        return res.status(500).json({ message: 'Failed to create treatment', error: error.message });
    }
}

async function updateTreatment(req, res) {
    try {
        const treatment = await Treatment.findByIdAndUpdate(req.params.treatmentId, req.body, { new: true });
        if (treatment) {
            return res.status(200).json({ message: 'Treatment updated', treatment });
        } else {
            return res.status(404).send('Treatment not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteTreatment(req, res) {
    try {
        const treatment = await Treatment.findByIdAndDelete(req.params.treatmentId);
        if (treatment) {
            return res.status(200).json('Treatment deleted');
        } else {
            return res.status(404).send('Treatment not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllTreatments,
    getOneTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment
};

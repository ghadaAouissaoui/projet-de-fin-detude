const Treatment = require('../models/treatmentModel');

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
        const treatment = await Treatment.create(req.body);
        return res.status(200).json({ message: 'Treatment created', treatment });
    } catch (error) {
        res.status(500).send(error.message);
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

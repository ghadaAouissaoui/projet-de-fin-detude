const mongoose = require("mongoose");
const Appointment = require('../models/appointmentModel');
const Veterinary = require('../models/veterinaryModel');
const Pets = require('../models/petsModel');
const User = require('../models/userModel');
const Treatment = require('../models/treatmentModel');

async function getAllAppointments(req, res) {
    try {
        const appointments = await Appointment.find(req.query).populate('pet');
        if (appointments.length > 0) {
            return res.status(200).json(appointments);
        } else {
            return res.status(404).send('No appointments found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneAppointment(req, res) {
    try {
        const appointment = await Appointment.findById(req.params.appointmentId).populate('pet', 'name').populate('veterinaire', 'fullname');
        if (appointment) {
            return res.status(200).json({ message: `${appointment.pet.name} has an appointment with ${appointment.veterinaire.fullname}`, appointment });
        } else {
            return res.status(404).send('Appointment not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getVetAppointments(req, res) {
    const { vetId } = req.params;

    try {
        const veterinaire = await Veterinary.findOne({ _id: vetId });

        if (!veterinaire) {
            return res.status(404).send('Vet not found');
        }

        const vetAppointments = await Appointment.find({ veterinaire: vetId }).populate('pet');

        if (vetAppointments.length > 0) {
            const message = `Appointment schedule of ${veterinaire.fullname}`;
            return res.status(200).json({ message, appointments: vetAppointments });
        } else {
            return res.status(404).send('No appointments found for this vet');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getPetAppointments(req, res) {
    try {
        const user = await User.findById(req.userId).populate('pet');
        if (!user) {
            return res.status(404).send('User not found');
        }

        const message = `${user.fullname}, these are the upcoming appointments for your pets.`;
        const petAppointments = user.pets;
        res.status(200).json({ message, petAppointments });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getAvailableAppointments(req, res) {
    try {
        const availableAppointments = await Appointment.find({ status: 'available' }).select('id appointment_date appointment_time status').populate('user', 'fullname');
        const message = `These are our next available appointments:`;
        return res.status(200).json({ message, availableAppointments });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getUnavailableAppointments(req, res) {
    try {
        const { vetId } = req.params;

        // Recherchez les rendez-vous non disponibles pour le vétérinaire spécifié
        const unavailableAppointments = await Appointment.find({ status: 'not_available', veterinaire: vetId }).populate('pet')
            .select('id appointment_date appointment_time status pet ')

        const message = `Unavailable appointments for veterinarian ${vetId}:`;
        return res.status(200).json({ message, unavailableAppointments });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}



async function bookAppointment(req, res) {
    try {
        const { treatmentIds, petId, vetId } = req.body;
        const appointment = await Appointment.findById(req.params.appointmentId);

        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }

        if (appointment.status !== 'available') {
            return res.status(409).send('Appointment is not available for booking');
        }

        // Check if it's the first appointment for the pet
        const isFirstAppointment = appointment.treatments.length === 0;

        // If it's the first appointment and no treatments provided, assign a default treatment
        if (isFirstAppointment && treatmentIds.length === 0) {
            // Générer un nouvel ObjectId pour le traitement par défaut
            const defaultTreatmentId = new mongoose.Types.ObjectId();
            treatmentIds.push(defaultTreatmentId);
        }

        // Add treatment schedule to the appointment
        await Appointment.findByIdAndUpdate(
            req.params.appointmentId,
            { $push: { schedule: { $each: treatmentIds } } }
        );

        // Find treatments and concatenate descriptions
        const treatments = await Treatment.find({ _id: { $in: treatmentIds } });
        const description = treatments.map(treatment => treatment.description).join(', ');

        // Update appointment details
        await Appointment.findByIdAndUpdate(req.params.appointmentId, {
            description,
            status: 'not_available'
        });

        // Check if the pet exists in the veterinarian's associated pets
        const veterinaire = await Veterinary.findById(vetId);
        if (!veterinaire) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        let petExists = false;
        for (const associatedPet of veterinaire.pets) {
            if (associatedPet.equals(petId)) {
                petExists = true;
                break;
            }
        }

        // If the pet doesn't exist in the veterinarian's associated pets, add it
        if (!petExists) {
            veterinaire.pets.push(petId);
            await veterinaire.save();
        }

        // Add the appointment to the pet's appointments
        const pet = await Pets.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        pet.appointments.push(req.params.appointmentId);
        await pet.save();

        return res.status(200).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



async function scheduleAppointment(req, res) {
    try {
        const vetId = req.params.vetId;
        const { petName, appointment_date, appointment_time, reason } = req.body;

        // Vérifier si le vétérinaire existe
        const veterinaire = await Veterinary.findById(vetId);
        if (!veterinaire) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        // Rechercher l'animal par son nom
        const pet = await Pets.findOne({ name: petName });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Vérifier si l'animal existe dans la liste des pets du vétérinaire
        const existingPetIndex = veterinaire.pets.findIndex(p => p.equals(pet._id));
        if (existingPetIndex === -1) {
            return res.status(400).json({ message: 'Pet not found in the veterinarian\'s pets' });
        }

        const appointment = await Appointment.create({
            pet: pet._id,
            appointment_date,
            appointment_time,
            veterinaire: vetId,
            reason,
        });

        // Mettre à jour le statut de l'appointment
        await Appointment.findByIdAndUpdate(appointment._id, { status: 'not_available' });

        // Retourner le rendez-vous créé dans le format désiré
        return res.status(200).json({
            _id: appointment._id,
            pet: appointment.pet,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            veterinaire: appointment.veterinaire,
            status: appointment.status
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}



async function createAppointment(req, res) {
    try {
        const { petName, species, appointment_date, appointment_time, reason } = req.body;
        const userId = req.user.id;
        const vetId = req.params.vetId; // Assurez-vous d'obtenir l'ID du vétérinaire depuis les paramètres
        // Récupérer l'ID du vétérinaire depuis les paramètres de la requête

        // Vérifier si l'animal de compagnie existe dans le compte de l'utilisateur
        let pet = await Pets.findOne({ name: petName, user: userId });
        // Si l'animal de compagnie n'existe pas, le créer implicitement
        if (!pet) {
            pet = await Pets.create({
                name: petName,
                user: userId,
                species: species
                // Ajouter d'autres attributs requis pour l'animal de compagnie
            });

            // Trouver l'utilisateur et mettre à jour son array d'animaux de compagnie
            await User.findByIdAndUpdate(userId, { $push: { pets: pet._id } });
        }

        // Créer le rendez-vous
        const appointment = await Appointment.create({
            pet: pet._id,
            appointment_date,
            appointment_time,
            reason,
            veterinaire: vetId, // Associer le rendez-vous avec le vétérinaire
            // Ajouter d'autres attributs requis pour le rendez-vous
        });

        // Mettre à jour l'array d'objets de rendez-vous de l'animal de compagnie
        await Pets.findByIdAndUpdate(pet._id, { $push: { appointments: appointment._id } });

        // Exporter le nom de l'utilisateur à partir de l'animal de compagnie
        const userName = req.user.name; // En supposant que l'objet utilisateur a un champ 'name'

        return res.status(200).json({ message: 'Appointment created', appointment, userName });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}







  

async function updateAppointment(req, res) {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
        if (appointment) {
            return res.status(200).json({ message: 'Appointment updated', appointment });
        } else {
            return res.status(404).send('Appointment not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteAppointment(req, res) {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId);
        if (appointment) {
            return res.status(200).json('Appointment deleted');
        } else {
            return res.status(404).send('Appointment not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllAppointments,
    getOneAppointment,
    getVetAppointments,
    getPetAppointments,
    scheduleAppointment,
    getAvailableAppointments,
    createAppointment,
    updateAppointment,
    getUnavailableAppointments,
    bookAppointment,
    deleteAppointment
};

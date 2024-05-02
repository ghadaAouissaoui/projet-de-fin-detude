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
        const appointment = await Appointment.findById(req.params.appointmentId).populate('pet', 'name').populate('user', 'fullname');
        if (appointment) {
            return res.status(200).json({ message: `${appointment.pet.name} has an appointment with ${appointment.user.fullname}`, appointment });
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
        const user = await User.findById(res.locals.user.id).populate('pets');
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

async function bookAppointment(req, res) {
    try {
        const { treatmentIds, petId } = req.body;
        const appointment = await Appointment.findById(req.params.appointmentId);

        if (appointment) {
            if (appointment.status === 'available') {
                // Add logic to book appointment

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
                    petId,
                    status: 'not_available'
                });

                return res.status(200).json({ message: 'Appointment booked successfully' });
            } else {
                return res.status(409).send('Appointment is not available for booking');
            }
        } else {
            return res.status(404).send('Appointment not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


async function createAppointment (req, res) {
    try {
        const vetId = req.params.vetId;
        const { petName, appointmentDate, appointmentTime, reason } = req.body;

        // Rechercher l'animal par son nom
        const pet = await Pets.findOne({ name: petName });
        if (!pet) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        // Créer le rendez-vous
        const appointment = new Appointment({
            pet: pet._id,
            appointment_date: appointmentDate,
            appointment_time: appointmentTime,
            reason: reason
        });

        // Enregistrer le rendez-vous
        await appointment.save();

        return res.status(200).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


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
    getAvailableAppointments,
    createAppointment,
    updateAppointment,
    bookAppointment,
    deleteAppointment
};

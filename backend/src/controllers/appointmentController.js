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
        const { treatmentIds, petId } = req.body;
        const appointment = await Appointment.findById(req.params.appointmentId);

        if (appointment) {
            if (appointment.status === 'available') {
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




async function createAppointment(req, res) {
    try {
        const { petName, appointment_date, appointment_time, reason, species } = req.body;
        const userId = req.user.id;

        // Check if the pet exists in the user's account
        let pet = await Pets.findOne({ name: petName, user: userId });
        // If the pet doesn't exist, create it implicitly
        if (!pet) {
            pet = await Pets.create({
                name: petName,
                user: userId,
                species: species
                // Add other required attributes for the pet
            });

            // Find the user and update its pets array
            await User.findByIdAndUpdate(userId, { $push: { pets: pet._id } });
        }

        // Create the appointment
        const appointment = await Appointment.create({
            pet: pet._id,
            appointment_date,
            appointment_time,
            reason,
            // Add other required attributes for the appointment
        });

        // Update the pet's appointments array
        await Pets.findByIdAndUpdate(pet._id, { $push: { appointments: appointment._id } });

        // Export the name of the user from the pet
        const userName = req.user.name; // Assuming the user object has a 'name' field

        return res.status(200).json({ message: 'Appointment created', appointment, userName });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}






async function scheduleAppointment(req,res){
    try {
        const { petName ,appointment_date, appointment_time, duration } = req.body;
        
             // Rechercher l'animal par son nom
        const pet = await Pets.findOne({ name: petName });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Create the appointment
        const appointment = await Appointment.create({
            pet: pet._id, // Associate the appointment with the pet
            appointment_date,
            appointment_time,
            veterinaire: req.params.vetId, // Associate the appointment with the veterinarian
            duration
            
        });

        // Add the appointment to the pet's appointments array
        pet.appointments.push(appointment);

        // Save the updated pet document
        await pet.save();   

         // Add the pet to the veterinarian's associated pets
         const veterinaire = await Veterinary.findById(req.params.vetId);
         if (!veterinaire) {
             return res.status(404).json({ message: 'Veterinarian not found' });
         }

          // Add the pet to the veterinarian's associated pets array
        veterinaire.pets.push(pet);

        // Save the updated veterinarian document
        await veterinaire.save();

        return res.status(200).json({ message: 'Appointment scheduled', appointment: appointment });
    } catch (error) {
        res.status(500).send(error.message);
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

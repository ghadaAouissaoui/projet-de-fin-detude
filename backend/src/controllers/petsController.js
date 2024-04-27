const Pets = require('../models/petsModel');
const User = require('../models/userModel');

async function getAllPets(req, res) {
    try {
        const pets = await Pets.find(req.query);
        if (pets.length > 0) {
            return res.status(200).json(pets);
        } else {
            return res.status(404).send('No Pets found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOnePet(req, res) {
    try {
        const pet = await Pets.findById(req.params.petId);
        if (pet) {
            return res.status(200).json(pet);
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOwnerPet(req, res) {
    try {
        const user = await User.findById(res.locals.user.id).populate('pets');
        if (!user) {
            return res.status(404).send('User not found');
        }

        const message = `${user.first_name}, these are the upcoming appointments for your pets.`;
        const petAppointments = user.pets;
        return res.status(200).json({ message, petAppointments });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createPetProfile(req, res) {
    try {
        const pet = await Pets.create(req.body);
        const user = await User.findById(res.locals.user.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.pets.push(pet);
        await user.save();

        return res.status(200).json({ message: `${pet.name} created and added to ${user.fullname}`, pet });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createPetPersonnel(req, res) {
    try {
        const pet = await Pets.create(req.body);
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.pets.push(pet);
        await user.save();

        return res.status(200).json({ message: `${pet.name} created and added to ${user.fullname}`, pet });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function updatePet(req, res) {
    try {
        const pet = await Pets.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        if (pet) {
            return res.status(200).json({ message: 'Pet updated', pet });
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function addPetToUser(req, res) {
    try {
        const pet = await Pets.findById(req.params.petId);
        const user = await User.findById(req.params.userId);

        if (pet && user) {
            user.pets.push(pet);
            await user.save();
            return res.status(200).send(`${pet.name} added to ${user.fullname}`);
        } else {
            return res.status(404).send('Pet or user not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deletePet(req, res) {
    try {
        const pet = await Pets.findByIdAndDelete(req.params.petId);
        if (pet) {
            return res.status(200).json('Pet deleted');
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPets,
    getOnePet,
    getOwnerPet,
    createPetProfile,
    createPetPersonnel,
    updatePet,
    addPetToUser,
    deletePet
};

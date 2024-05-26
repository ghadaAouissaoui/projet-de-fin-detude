const Pet = require('../models/petsModel');
const User = require('../models/userModel');
const Appointment=require('../models/appointmentModel');
const Treatment =require("../models/treatmentModel");
const Veterinary=require("../models/veterinaryModel")
async function getAllPets(req, res) {
    try {
        const pets = await Pet.find(req.query);
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
        const pet = await Pet.findById(req.params.petId);
        if (pet) {
            return res.status(200).json(pet);
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Controller function to create a new pet
const createPetProfile = async (req, res) => {
    const { userId } = req.params; // Assuming userId is sent in the request body
    const {
        name,
        dateOfBirth,
        chipNumber,
        species,
        breed,
        sex,
        profilePicture,
        comments,
        medicalHistory,
    } = req.body;

    try {
        // Check if the pet already exists in the database
        const petExists = await Pet.findOne({ name });

        if (petExists) {
            return res.status(400).json({ message: "The pet already exists. Please choose a different name or update the existing one." });
        }

        // Fetch the user object based on the provided user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new pet object
        const newPet = new Pet({
            name,
            dateOfBirth,
            chipNumber,
            species,
            breed,
            sex,
            profilePicture,
            comments,
            medicalHistory,
            user: userId, // Associate the pet with the user's ID
        });

        // Push the new pet's ID into the user's pets array
        user.pets.push(newPet._id);

        // Save both the pet and the user objects
        await newPet.save();
        await user.save();

        // Return a success response
        return res.status(201).json({ message: 'Pet created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error creating pet:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




async function getOwnerPet(req, res) {
    try {
        // Trouver l'animal par son nom dans le modèle Pet
        const pet = await Pet.findOne({ name: req.body.name }).populate('user');
        if (!pet) {
            return res.status(404).send('Pet not found');
        }

        // Accéder au champ user de l'animal pour obtenir l'objet utilisateur
        const user = pet.user;
        if (!user) {
            return res.status(404).send('Owner not found');
        }

        // Retourner les détails de l'utilisateur
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


async function createPetPersonnel(req, res) {
    try {
        const { email, vetId, ...petData } = req.body;
        
        console.log('Pet data:', petData);

        // Créer un nouvel animal de compagnie avec les données fournies
        const pet = await Pet.create(petData);
        if (!pet) {
            console.log('Failed to create pet');
            return res.status(400).send('Failed to create pet');
        }

        console.log('Created pet:', pet);

        // Rechercher l'utilisateur par e-mail
        const user = await User.findOne({ email });
        if (user) {
            // Ajouter l'animal de compagnie à l'utilisateur s'il existe
            user.pets.push(pet._id);
            await user.save();
        } else {
            // Si l'utilisateur n'existe pas, afficher un message
            console.log('User not found. Pet will be linked when user registers.');
        }

        console.log('User:', user);

        // Rechercher le vétérinaire par ID
        const veterinary = await Veterinary.findById(vetId);
        if (!veterinary) {
            console.log('Veterinary not found');
            return res.status(404).send('Veterinary not found');
        }

        console.log('Veterinary:', veterinary);

        // Ajouter l'animal de compagnie au vétérinaire
        veterinary.pets.push(pet._id);
        await veterinary.save();

        return res.status(200).json({ message: `${pet.name} created and added to ${user ? user.fullname : 'the new user'}`, pet });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
}






async function updatePet(req, res) {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        if (pet) {
            return res.status(200).json({ message: 'Pet updated', pet });
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function historical(req, res) {
    const { petId } = req.params;

    try {
        // Récupérer le document Pet et remplir les champs appointments et treatments
        const pet = await Pet.findById(petId).populate('user')
            .populate({
                path: 'appointments',
                populate: {
                    path: 'treatments'
                }
            });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error fetching medical history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//il est supposé que l'animal de compagnie existe déjà dans la base de données, et il est recherché en fonction de son ID dans req.params.petId à l'aide de Pet.findOne().
async function addPetToUser(req, res) {
    try {
        const pet = await Pet.findById(req.params.petId);
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
        const pet = await Pet.findByIdAndDelete(req.params.petId);
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
    historical,
    addPetToUser,
    deletePet
};

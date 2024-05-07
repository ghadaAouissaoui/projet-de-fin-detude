const Pet = require('../models/petsModel');
const User = require('../models/userModel');

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



async function createPet(req, res) {
    try {
        // Création d'un nouvel objet Pet à partir du corps de la requête
        const pet = await Pet.create(req.body);

        // Recherche de l'utilisateur associé à l'animal de compagnie
        const user = await User.findById(req.params.id);

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(404).send('User not found');
        }

         // Ajout de l'ID de l'animal de compagnie à la liste des animaux de l'utilisateur
         user.pets.push(pet._id); // Ajoutez pet._id au lieu de pet

         // Sauvegarde des modifications de l'utilisateur dans la base de données
         await user.save();

        // Réponse avec un message de succès et les détails de l'animal de compagnie créé
        return res.status(200).json({ message: `${pet.name} created and added to ${user.fullname}`, pet });
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur avec le message d'erreur approprié
        return res.status(500).send(error.message);
    }
}

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
        const pet = await Pet.create(req.body);
        const user = await User.findById(req.body.email);

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
    
    addPetToUser,
    deletePet
};

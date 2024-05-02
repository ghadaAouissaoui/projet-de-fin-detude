const Pet = require('../models/petsModel');
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


// Controller function to create a new pet
/*const createPet = async (req, res) => {
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
        ownerEmail // New field to associate the pet with the owner's email
    } = req.body;

    try {
        // Find the user by their email
        const owner = await User.findOne({ email: ownerEmail });
        
        // Check if the owner exists
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        // Vérification si l'animal existe déjà dans la base de données
    const petExists = await Pets.findOne({ name });

    if (petExists) {
        res.status(400);
        throw new Error("L'animal existe déjà choisir un notre nom ou update l'ancien.");
    }

        // Create a new pet object
        const newPet = new Pets({
            name,
            dateOfBirth,
            chipNumber,
            species,
            breed,
            sex,
            profilePicture,
            comments,
            medicalHistory,
            owner: owner._id // Associate the pet with the owner's ID
        });

        // Save the pet to the database
        await newPet.save();

        // Return a success response
        return res.status(201).json({ message: 'Pet created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error creating pet:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};*/

async function createPetProfile(req, res) {
    try {
        // Création d'un nouvel objet Pet à partir du corps de la requête
        const pet = await Pet.create(req.body);

        // Recherche de l'utilisateur associé à l'animal de compagnie
        const user = await User.findById(req.params.id);

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Ajout de l'animal de compagnie à la liste des animaux de l'utilisateur
        user.pets.push(pet);

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
        // Find the pet by its name in the Pet model
        const pet = await Pets.findOne({ name: req.body.name }).populate('User');
        if (!pet) {
            return res.status(404).send('Pet not found');
        }

        // Access the owner field of the pet to get the user object
        const user = pet.owner;
        if (!user) {
            return res.status(404).send('Owner not found');
        }

        // Return the user details
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

/*async function createPetProfile(req, res) {
    try {
        const pet = await Pets.create(req.body);
        const user = await User.find(req.body.ownerEmail);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.pets.push(pet);
        await user.save();

        return res.status(200).json({ message: `${pet.name} created and added to ${user.fullname}`, pet });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}*/

async function createPetPersonnel(req, res) {
    try {
        const pet = await Pets.create(req.body);
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

//il est supposé que l'animal de compagnie existe déjà dans la base de données, et il est recherché en fonction de son ID dans req.params.petId à l'aide de Pet.findOne().
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

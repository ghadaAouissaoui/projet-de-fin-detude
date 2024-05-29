const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const asyncHandler = require('express-async-handler'); 
const crypto = require('crypto');
const User = require('../models/userModel'); 
const Token = require('../models/tokenModel')
const {envoyerVerification }= require('../utils/sendEmail')


const registerUser = asyncHandler(async (req, res) => {
    
    const { fullname, email, datebirth,phoneNumber,password,confirmpassword } = req.body;

    // Vérification si tous les champs requis sont fournis
    if (!fullname || !email || !datebirth ||!phoneNumber || !password || !confirmpassword) {
        res.status(400);
        throw new Error('Ajoutez tous les champs requis');
    }

    // Vérification si l'utilisateur existe déjà dans la base de données
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("L'utilisateur existe déjà.");
    }

     // Vérification de la correspondance des mots de passe
     if (password !== confirmpassword) {
        res.status(400);
        throw new Error('Les mots de passe ne correspondent pas.');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Génération du token de vérification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Création d'un nouvel utilisateur dans la base de données
    const user = await User.create({
        fullname,
        email,
        datebirth,
        phoneNumber,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        role: 'user' //Default role for users
    });
    // Enregistrement du token de vérification dans la base de données
    const tokenInstance = await Token.create({
        userId: user._id,
        ref:"user",
        token: verificationToken,
    });
    
  

    // Envoi de l'email de vérification
    const verificationUrl = `${process.env.BASE_URL}users/${user._id}/verify/${verificationToken}`;
    await envoyerVerification(email,verificationUrl);

    // Envoi d'une réponse JSON contenant les détails de l'utilisateur et un message
    res.status(201).json({
        fullname,
        email,
        role,
        message: "Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre email pour activer votre compte."
    });

    // Ne pas enregistrer l'utilisateur dans la base de données pour le moment
});





const verifyEmail = async (req, res) => {
    const token = req.params.token;
    
    try {
        // Trouver le jeton dans la base de données
        const verificationToken = await Token.findOne({ token });

        if (!verificationToken) {
            return res.status(400).json({ message: "Le jeton de vérification n'est pas valide." });
        }

        // Trouver l'utilisateur associé au jeton
        const user = await User.findById(verificationToken.userId);

        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        // Mettre à jour le statut de vérification de l'utilisateur
        user.verified = true;
        await user.save();

        // Supprimer le jeton de vérification de la base de données en utilisant la méthode removeToken()
        await verificationToken.removeToken();

        // Répondre avec un message de succès
        return res.status(200).json({ message: "L'email a été vérifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification de l'email." });
    }
};







const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Vérification de l'existence de l'utilisateur et comparaison du mot de passe haché
    if (user && (await bcrypt.compare(password, user.password))) {
        // Vérification de l'email
        if (!user.verified) {
           return res.status(400).json({ message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre email pour activer votre compte." });
        }

        // Si l'utilisateur est vérifié, génération du token d'authentification JWT
        const token = generateToken(user._id,user.role);
        
        // Envoi des détails de l'utilisateur et du token
        res.json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400);
        throw new Error('Informations d\'identification invalides');
    }
});





// Fonction pour générer un jeton d'authentification JWT
const generateToken = (id,role) => {
    return jwt.sign({ id,role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};





// Route handler function to get all users
const getAllUsers = async (req, res) => {
    try {
        // Query the database for all users, excluding the password field
        const users = await User.find({}, { password: 0 });

        // Check if users were found
        if (users.length > 0) {
            // Return the users in the response
            res.status(200).json(users);
        } else {
            // If no users were found, return a 404 status with an error message
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        // If an error occurs during the database query, return a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};

// Route handler function to get all owners
const getAllOwners = async (req, res) => {
    try {
        // Query the database for all users with the role 'user', including their associated pets
        const owners = await User.find({ role: 'user' }).populate('pets', '-password');

        // Check if owners were found
        if (owners.length > 0) {
            // Return the owners in the response
            res.status(200).json(owners);
        } else {
            // If no owners were found, return a 404 status with an error message
            res.status(404).json({ message: 'No owners found' });
        }
    } catch (error) {
        // If an error occurs during the database query, return a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};


// Route handler function to get the user's own profile
const getOwnProfile = async (req, res) => {
    try {
        // Query the database for the user based on the logged-in user's ID
        const user = await User.findById(req.params.id).populate({
            path: 'pets',
            populate: {
                path: 'appointments'
            }
        });

        // Check if the user was found
        if (user) {
            // Create a message for the user
            const message = `Hi ${user.fullname}!, this is your profile and the clinic history of your pets.`;

            // Return the user's profile and pets in the response
            res.status(200).json({ message, user });
        } else {
            // If the user was not found, return a 404 status with an error message
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs during the database query, return a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};


// Route handler function to get a specific user by their ID
const getOneUser = async (req, res) => {
    try {
        // Query the database for the user based on the provided user ID
        const user = await User.findById(req.params.userId).select('-password');

        // Check if the user was found
        if (user) {
            // If the user is found, return the user object in the response
            res.status(200).json(user);
        } else {
            // If the user was not found, return a 404 status with an error message
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs during the database query, return a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};



// Route handler function to update a user by their ID
const updateUser = async (req, res) => {
    try {
        // Update the user based on the provided user ID and request body
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        // Check if the user was updated successfully
        if (user) {
            // If the user is updated successfully, return a success message along with the updated user object
            res.status(200).json({ message: 'User updated', user: user });
        } else {
            // If the user was not found, return a 404 status with an error message
            res.status(404).send('User not found');
        }
    } catch (error) {
        // If an error occurs during the database operation, return a 500 status with the error message
        res.status(500).send(error.message);
    }
};



// Route handler function to update an owner by their ID
async function updateOwner(req, res) {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Check if the provided role is 'user'
        if (role !== 'user') {
            return res.status(401).send('User not authorized to update this user');
        }

        // Update the owner based on the provided user ID
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        // If the owner is not found
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        // If the owner is updated successfully and the role remains 'user'
        return res.status(200).json({ message: 'Owner updated', user: updatedUser });
    } catch (error) {
        // If an error occurs during the database operation
        return res.status(500).send(error.message);
    }
}



// Route handler function to update the authenticated user's profile
async function updateOwnUser(req, res) {
    try {
        const { id } = res.locals.user; // Assuming the user ID is stored in res.locals.user

        // Update the authenticated user's profile based on their ID
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        // If the user is found and updated successfully
        if (updatedUser) {
            return res.status(200).json({ message: 'User updated', user: updatedUser });
        } else {
            // If the user is not found
            return res.status(404).send('User not found');
        }
    } catch (error) {
        // If an error occurs during the database operation
        return res.status(500).send(error.message);
    }
}




// Function to delete a user by ID
async function deleteUser(req, res) {
    try {
        // Extract the user ID from the request parameters
        const { userId } = req.params;

        // Delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);

        // If the user is found and deleted successfully
        if (deletedUser) {
            return res.status(200).send('User deleted');
        } else {
            // If the user is not found
            return res.status(404).send('User not found');
        }
    } catch (error) {
        // If an error occurs during the database operation
        return res.status(500).send(error.message);
    }
}

// Function to delete a user by ID if the user has the role 'user'
async function deleteOwner(req, res) {
    try {
        // Extract the user ID from the request parameters
        const { userId } = req.params;

        // Find and delete the user by ID and role 'user'
        const deletedUser = await User.findOneAndDelete({ _id: userId, role: 'user' });

        // If the user is found and deleted successfully
        if (deletedUser) {
            return res.status(200).send('User deleted');
        } else {
            // If the user is not found or not authorized to delete this user
            return res.status(404).send('User not found or not authorized to delete this user');
        }
    } catch (error) {
        // If an error occurs during the database operation
        return res.status(500).send(error.message);
    }
}

// Function to delete the authenticated user's own profile
async function deleteOwnUser(req, res) {
    try {
        const { id } = res.locals.user; // Assuming the user ID is stored in res.locals.user

        // Delete the authenticated user's own profile based on their ID
        const deletedUser = await User.findByIdAndDelete(id);

        // If the user is found and deleted successfully
        if (deletedUser) {
            return res.status(200).send('User deleted');
        } else {
            // If the user is not found
            return res.status(404).send('User not found');
        }
    } catch (error) {
        // If an error occurs during the database operation
        return res.status(500).send(error.message);
    }
}

async function getByEmail(req,res){
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    getAllUsers,
	getOwnProfile,
	getAllOwners,
	getOneUser,
	updateUser,
	updateOwner,
	updateOwnUser,
	deleteUser,
	deleteOwner,
	deleteOwnUser,
    getByEmail,
};


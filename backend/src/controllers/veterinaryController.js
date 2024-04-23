const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Veterinary = require('../models/veterinaryModel');
const Token = require('../models/tokenModel');
const { envoyerVerification } = require('../utils/sendEmail');
const crypto = require('crypto');

// Function to register a new veterinarian
const registerVeterinary = asyncHandler(async (req, res) => {
    const { fullname, email, specialite, address, datebirth, phoneNumber, password, confirmpassword, role } = req.body;

    // Check if all required fields are provided
    if (!fullname || !email || !specialite || !address || !datebirth || !phoneNumber || !password || !confirmpassword || !role) {
        res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
        return;
    }

    // Check if the email is already in use
    const existingVeterinary = await Veterinary.findOne({ email });
    if (existingVeterinary) {
        res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
        return;
    }

    // Check if passwords match
    if (password !== confirmpassword) {
        res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the new veterinarian
    const veterinaire = await Veterinary.create({
        fullname,
        email,
        specialite,
        address,
        datebirth,
        phoneNumber,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        role
    });

    // Save the verification token
    await Token.create({
        userId: veterinaire._id,
        ref:"veterinaire",
        token: verificationToken,
    });

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}veterinaries/${veterinaire._id}/verify/${verificationToken}`;
    await envoyerVerification(email, verificationUrl);

    // Return success response
    res.status(201).json({
        fullname: veterinaire.fullname,
        email: veterinaire.email,
        role: veterinaire.role,
        message: "Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre email pour activer votre compte."
       
    });
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
        const veterinaire = await Veterinary.findById(verificationToken.veterinaire._id);

        if (!veterinaire) {
            return res.status(400).json({ message: "Vétérinaire non trouvé." });
        }

        // Mettre à jour le statut de vérification de l'utilisateur
        veterinaire.verified = true;
        await veterinaire.save();

        // Supprimer le jeton de vérification de la base de données en utilisant la méthode removeToken()
        await verificationToken.removeToken();

        // Répondre avec un message de succès
        return res.status(200).json({ message: "L'email a été vérifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification de l'email." });
    }
};




// Fonction pour la connexion d'un vétérinaire
const loginVeterinary = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    try {
        // Recherche de l'utilisateur dans la base de données
        const veterinaire = await Veterinary.findOne({ email });

        if (!veterinaire) {
            throw new Error('Informations d\'identification invalides');
        }

        // Vérification de l'existence de l'utilisateur et comparaison du mot de passe haché
        const isPasswordValid = await bcrypt.compare(password, veterinaire.password);
        
        if (!isPasswordValid) {
            throw new Error('Informations d\'identification invalides');
        }

        // Vérification de l'email
        if (!veterinaire.verified) {
            return res.status(400).json({ message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre email pour activer votre compte." });
        }

        // Si l'utilisateur est vérifié, génération du token d'authentification JWT
        const token = generateToken(veterinaire._id);
        
        // Envoi des détails de l'utilisateur et du token
        res.json({
            _id: veterinaire.id,
            fullname: veterinaire.fullname,
            email: veterinaire.email,
            token: token,
        });
    } catch (error) {
        console.error('Erreur lors de la connexion du vétérinaire:', error.message);
        res.status(400).json({ message: 'Informations d\'identification invalides' });
    }
});


const getVeto = asyncHandler (async (req,res) =>{
    const { _id, fullname, email} = await Veterinary.findById(req.veterinaire.id)
  
    res.status(200).json({
      id:_id,
      fullname,
      email,
    })
      
  })

// Fonction pour générer le token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};



module.exports = {
    registerVeterinary,
    loginVeterinary,
    getVeto,
    verifyEmail,
};

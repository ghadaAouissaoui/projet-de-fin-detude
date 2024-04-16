const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Veterinary = require('../models/veterinaryModel');
const Token = require('../models/tokenModel')
const {envoyerVerification }= require('../utils/sendEmail')
const crypto = require('crypto');

// Fonction pour l'inscription d'un nouveau vétérinaire
const registerVeterinary = asyncHandler(async (req, res) => {
    const { firstname, lastname, specialite, address, email, password, confirmpassword, role } = req.body;

    // Vérification des champs requis
    if (!firstname || !lastname || !specialite || !address || !email || !password || !confirmpassword || !role) {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs.');
    }

    // Vérification si l'email est déjà utilisé
    const existingVeterinary = await Veterinary.findOne({ email });
    
    if (existingVeterinary) {
        res.status(400);
        throw new Error('Un compte avec cet email existe déjà.');
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmpassword) {
        res.status(400);
        throw new Error('Les mots de passe ne correspondent pas.');
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Génération du token de vérification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Création du nouveau vétérinaire avec le rôle
    const veterinaire = await Veterinary.create({
        firstname,
        lastname,
        specialite,
        address,
        email,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        role, // Ajoutez le champ role ici
        verificationToken // Enregistrez le token de vérification dans la base de données
    });


    // Enregistrement du token de vérification dans la base de données
    const tokenInstance = await Token.create({
        userId: veterinaire._id,
        token: verificationToken,
    });

    // Envoi de l'email de vérification
    const verificationUrl = `${process.env.BASE_URL}/veterinarians/verify/${verificationToken}`;
    await envoyerVerification(email, verificationUrl);

    // Génération du token JWT pour la réponse
    const token = generateToken(veterinaire._id);

    res.status(201).json({
        _id: veterinaire.id,
        firstname: veterinaire.firstname,
        lastname: veterinaire.lastname,
        specialite: veterinaire.specialite,
        address: veterinaire.address,
        email: veterinaire.email,
        role: veterinaire.role,
        token,
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

        // Trouver le vétérinaire associé au jeton
        const veterinaire = await Veterinary.findById(verificationToken.userId);

        if (!veterinaire) {
            return res.status(400).json({ message: "Vétérinaire non trouvé." });
        }

        // Mettre à jour le statut de vérification du vétérinaire
        veterinaire.verified = true;
        await veterinaire.save(); // Enregistrez le vétérinaire dans la base de données après vérification

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

    // Recherche du vétérinaire par email
    const veterinaire = await Veterinary.findOne({ email });

    // Vérification si le vétérinaire existe et si le mot de passe est correct
    if (veterinaire && (await bcrypt.compare(password, veterinaire.password))) {
      

        res.json({
            _id: veterinaire.id,
            firstname: veterinaire.firstname,
            lastname: veterinaire.lastname,
            specialite: veterinaire.specialite,
            address: veterinaire.address,
            email: veterinaire.email,
            token:generateToken(veterinaire._id),
        });
    } else {
        res.status(401);
        throw new Error('Email ou mot de passe incorrect.');
    }
});


const getVeto = asyncHandler (async (req,res) =>{
    const { _id, firstname, email} = await Veterinary.findById(req.veterinaire.id)
  
    res.status(200).json({
      id:_id,
      firstname,
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

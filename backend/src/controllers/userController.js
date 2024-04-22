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
        confirmpassword: hashedPassword
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
        const token = generateToken(user._id);
        
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
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
};


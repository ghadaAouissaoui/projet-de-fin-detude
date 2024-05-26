// Importation des modules nécessaires
const asyncHandler = require('express-async-handler');
const Secretaire = require('../models/secretaireModel'); // Importez le modèle de secrétaire
const Veterinary = require('../models/veterinaryModel'); // Importez le modèle de vétérinaire
const Token = require('../models/tokenModel')
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto');
const {envoyerVerification }= require('../utils/sendEmail');




// Fonction pour créer un secrétaire
const createSecretary = asyncHandler(async (req, res) => {
  const { fullname, email, telephone, cin, password, role } = req.body;

  // Vérification si tous les champs requis sont fournis
  if (!fullname || !email || !telephone || !cin || !password || !role) {
    res.status(400);
    throw new Error('Ajoutez tous les champs requis');
  }

  // Vérification si l'utilisateur existe déjà dans la base de données
  const secretaireExists = await Secretaire.findOne({ email });
  if (secretaireExists) {
    res.status(400);
    throw new Error("Le secrétaire existe déjà.");
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Génération du token de vérification
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Vérifiez si l'utilisateur authentifié est un vétérinaire
  if (req.veterinaire) {
    try {
      // Créez le secrétaire associé au vétérinaire
      const secretary = new Secretaire({
        fullname,
        email,
        telephone,
        cin,
        role: "secretaire",
        password: hashedPassword,
        veterinarian: req.veterinaire._id // Associez le secrétaire au vétérinaire authentifié
      });

      // Vérifiez si le vétérinaire existe
      const vet = await Veterinary.findById(req.veterinaire._id);
      if (vet) {
        // Sauvegarder le secrétaire
        await secretary.save();

        // Associez le secrétaire au vétérinaire
        await vet.secretaires.push(secretary);
        await vet.save();
      } else {
        return res.status(404).send('Veterinary not found');
      }

      // Enregistrement du token de vérification dans la base de données
      await Token.create({
        userId: secretary._id,
        ref: "secretaire",
        token: verificationToken,
      });

      // Envoi de l'email de vérification
      const verificationUrl = `${process.env.BASE_URL}secretaires/${secretary._id}/verify/${verificationToken}`;
      await envoyerVerification(email, verificationUrl);

      // Envoi d'une réponse JSON contenant les détails de l'utilisateur et un message
      res.status(201).json({
        fullname,
        email,
        role,
        message: "Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre email pour activer votre compte."
      });
    } catch (error) {
      console.error("Error creating secretary:", error);
      res.status(500).send("Une erreur s'est produite lors de la création du secrétaire.");
    }
  } else {
    res.status(403);
    throw new Error("Non autorisé");
  }
});


// Fonction pour vérifier l'email
const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
      // Trouver le jeton dans la base de données
      const verificationToken = await Token.findOne({ token });

      if (!verificationToken) {
          return res.status(400).json({ message: "Le jeton de vérification n'est pas valide." });
      }

      // Trouver l'utilisateur associé au jeton
      const user = await Secretaire.findById(verificationToken.userId); // Correction du modèle utilisateur

      if (!user) {
          return res.status(400).json({ message: "Utilisateur non trouvé." });
      }

      // Mettre à jour le statut de vérification de l'utilisateur
      user.verified = true;
      await user.save();

      // Supprimer le jeton de vérification de la base de données
      await Token.deleteOne({ token });

      // Répondre avec un message de succès
      return res.status(200).json({ message: "L'email a été vérifié avec succès." });
  } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
      return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification de l'email." });
  }
};

const loginSecretaire = asyncHandler(async (req, res) => {
  const { email, password } = req.body; 

  // Recherche de l'utilisateur dans la base de données
  const secretaire = await Secretaire.findOne({ email });

  // Vérification de l'existence de l'utilisateur et comparaison du mot de passe haché
  if (secretaire && (await bcrypt.compare(password, secretaire.password))) {
      // Vérification de l'email
      if (!secretaire.verified) {
         return res.status(400).json({ message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre email pour activer votre compte." });
      }

      // Si l'utilisateur est vérifié, génération du token d'authentification JWT
      const token = generateToken(secretaire._id,secretaire.role);
      
      // Envoi des détails de l'utilisateur et du token
      res.json({
          _id: secretaire.id,
          fullname: secretaire.fullname,
          email: secretaire.email,
          token: token,
          veterinarian: secretaire.veterinarian,
      });
  } else {
      res.status(400);
      throw new Error('Informations d\'identification invalides');
  }
});


// Fonction pour obtenir tous les secrétaires
const getAllSecretaries = asyncHandler(async (req, res) => {
  const secretaries = await Secretaire.find();
  res.status(200).json(secretaries);
});

const getOneSec= async (req, res) => {
  try {
      // Query the database for the user based on the provided user ID
      const user = await Secretaire.findById(req.params.secretaireId).select('-password');

      // Check if the user was found
      if (user) {
          // If the user is found, return the user object in the response
          res.status(200).json(user);
      } else {
          // If the user was not found, return a 404 status with an error message
          res.status(404).json({ message: 'Secretaire not found' });
      }
  } catch (error) {
      // If an error occurs during the database query, return a 500 status with the error message
      res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour un secrétaire
const updateSecretary = asyncHandler(async (req, res) => {
  const { id } = req.params; // Récupérer l'ID du secrétaire à mettre à jour
  const updatedSecretary = await Secretaire.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "Secrétaire mis à jour avec succès", updatedSecretary });
});

// Fonction pour supprimer un secrétaire
const deleteSecretary = asyncHandler(async (req, res) => {
  const { id } = req.params; // Récupérer l'ID du secrétaire à supprimer
  await Secretaire.findByIdAndDelete(id);
  res.status(200).json({ message: "Secrétaire supprimé avec succès" });
});


// Fonction pour générer un jeton d'authentification JWT
const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  });
};


// Exportez les fonctions du contrôleur pour les utiliser dans les routes
module.exports = {
  createSecretary,
  getAllSecretaries,
  updateSecretary,
  verifyEmail,
  getOneSec,
  loginSecretaire,
  deleteSecretary
};

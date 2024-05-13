// Importation des modules nécessaires
const asyncHandler = require('express-async-handler');
const Secretaire = require('../models/secretaireModel'); // Importez le modèle de secrétaire
const Veterinary = require('../models/veterinaryModel'); // Importez le modèle de vétérinaire

// Fonction pour créer un secrétaire
const createSecretary = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, telephone, cin, password ,role} = req.body;
// Hashage du mot de passe
const hashedPassword = await bcrypt.hash(password, 10);
    // Vérifiez si l'utilisateur authentifié est un vétérinaire
    if (req.veterinaire) {
      // Créez le secrétaire associé au vétérinaire
      const secretary = new Secretaire({
        fullname,
        email,
        telephone,
        cin,
        role,
        password:hashedPassword,
        veterinarian: req.veterinaire._id, // Associez le secrétaire au vétérinaire authentifié
      });
      // Enregistrez le secrétaire dans la base de données
      await secretary.save();
      res.status(201).json({ message: "Secrétaire créé avec succès", secretary });
    } else {
      // Si l'utilisateur authentifié n'est pas un vétérinaire, renvoyez une erreur d'accès interdit
      res.status(403).json({ message: "Accès interdit. Seuls les vétérinaires sont autorisés à créer des secrétaires." });
    }
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: "Une erreur est survenue lors de la création du secrétaire", error: error.message });
  }
});


// Fonction pour obtenir tous les secrétaires
const getAllSecretaries = asyncHandler(async (req, res) => {
  const secretaries = await Secretaire.find();
  res.status(200).json(secretaries);
});

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

// Exportez les fonctions du contrôleur pour les utiliser dans les routes
module.exports = {
  createSecretary,
  getAllSecretaries,
  updateSecretary,
  deleteSecretary
};

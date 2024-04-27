const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Veterinary = require('../models/veterinaryModel');
const User=require('../models/userModel');

// Middleware pour vérifier si le vétérinaire ou l'utilisateur est authentifié
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtenez le jeton à partir de l'en-tête
      token = req.headers.authorization.split(' ')[1];
      // Vérifiez le jeton
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Vérifiez si c'est un vétérinaire ou un utilisateur
      if (decoded.role === 'veterinaire') {
        req.veterinaire = await Veterinary.findById(decoded.id).select('-password');
        if (!req.veterinaire) {
          throw new Error('Vétérinaire introuvable');
        }
      } else if (decoded.role === 'user') {
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
          throw new Error('Utilisateur introuvable');
        }
      } else {
        throw new Error('Rôle invalide dans le jeton');
      }
      
      // Passer à la prochaine étape du middleware
      next();
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé' });
    }
  } else {
    res.status(401).json({ message: 'Pas de jeton' });
  }
});




// Middleware pour vérifier le rôle de l'utilisateur
const checkVet = (role) => (req, res, next) => {
  if (req.veterinaire && req.veterinaire.role === role) {
    next(); // L'utilisateur a le rôle requis, passez à la prochaine fonction middleware
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role !== 'admin') {
      return res.status(401).send('User not authorized')
  }
  next()
}


module.exports = { protect, checkVet,checkAdmin };

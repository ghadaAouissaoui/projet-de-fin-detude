const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Veterinary = require('../models/veterinaryModel');

// Middleware pour vérifier si le vétérinaire est authentifié
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinaire = await Veterinary.findById(decoded.id).select('-password');
      if (!req.veterinaire) {
        throw new Error('Vétérinaire introuvable');
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé' });
    }
  } else {
    res.status(401).json({ message: 'Pas de token' });
  }
});

// Middleware pour vérifier le rôle de l'utilisateur
const checkUserRole = (role) => (req, res, next) => {
  if (req.veterinaire && req.veterinaire.role === role) {
    next(); // L'utilisateur a le rôle requis, passez à la prochaine fonction middleware
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

module.exports = { protect, checkUserRole };

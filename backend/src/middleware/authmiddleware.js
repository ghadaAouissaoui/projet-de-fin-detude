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

      if (!decoded || !decoded.id || !decoded.role) {
        throw new Error('Token invalide');
      }

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
      } else if (decoded.role === 'secretaire') {
        req.secretaire = await Secretaire.findById(decoded.id).select('-password');
        if (!req.secretaire) {
          throw new Error('Secrétaire introuvable');
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

function authMiddleware(req, res, next) {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      // Set user in request object
      req.user = {
          id: decodedToken.id,
          role: decodedToken.role // Optionally, you can also include the user's role
      };
      next(); // Proceed to next middleware
  });
}




const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role !== 'admin') {
      return res.status(401).send('User not authorized')
  }
  next()
}

// Middleware pour vérifier le rôle de l'utilisateur
const checkVet = (role) => (req, res, next) => {
  if (req.veterinaire && req.veterinaire.role === role) {
    next(); // L'utilisateur a le rôle requis, passez à la prochaine fonction middleware
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};




module.exports = { protect, authMiddleware,checkVet,checkAdmin };

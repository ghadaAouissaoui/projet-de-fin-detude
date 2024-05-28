// routes/reviewRoutes.js
const express = require('express');
const { getReviewsByUser, createReview, updateReview, deleteReview,getAllReviews } = require('../controllers/reviewController');

const router = express.Router();

// Route pour obtenir les avis d'un utilisateur spécifique
router.get('/user/:userId', getReviewsByUser);
// routes/reviewRoutes.js
router.get('/', getAllReviews);

// Route pour créer un nouvel avis
router.post('/', createReview);

// Route pour mettre à jour un avis
router.put('/:reviewId', updateReview);

// Route pour supprimer un avis
router.delete('/:reviewId', deleteReview);

module.exports = router;

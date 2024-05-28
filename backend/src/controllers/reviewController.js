// controllers/reviewController.js
const Review = require('../models/reviewModel');

// Obtenir les avis d'un utilisateur spécifique
const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};


const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};


// Créer un nouvel avis
const createReview = async (req, res) => {
  try {
    const { userId, name, email, review, rating } = req.body;
    const newReview = new Review({
      userId,
      name,
      email,
      review,
      rating
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Mettre à jour un avis
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { name, email, review, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { name, email, review, rating },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Supprimer un avis
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};

module.exports = {
  getReviewsByUser,
  createReview,
  updateReview,
  getAllReviews,
  deleteReview
};

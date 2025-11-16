const Review = require('../models/Review');
const Destination = require('../models/Destination');

const createReview = async (req, res) => {
  try {
    const { destination, rating, title, comment, photos } = req.body;

    const destinationExists = await Destination.findById(destination);
    if (!destinationExists) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const existingReview = await Review.findOne({ user: req.user._id, destination });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this destination' });
    }

    const review = await Review.create({
      user: req.user._id,
      destination,
      rating,
      title,
      comment,
      photos
    });

    const reviews = await Review.find({ destination, isApproved: true });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    destinationExists.rating.average = avgRating;
    destinationExists.rating.count = reviews.length;
    await destinationExists.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDestinationReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.destinationId, isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.isApproved = true;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    const reviews = await Review.find({ destination: review.destination, isApproved: true });
    const destination = await Destination.findById(review.destination);
    
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
      destination.rating.average = avgRating;
      destination.rating.count = reviews.length;
    } else {
      destination.rating.average = 0;
      destination.rating.count = 0;
    }
    
    await destination.save();

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getDestinationReviews,
  approveReview,
  deleteReview
};

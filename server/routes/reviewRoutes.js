const express = require('express');
const {
  createReview,
  getDestinationReviews,
  approveReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/destination/:destinationId', getDestinationReviews);
router.put('/:id/approve', protect, admin, approveReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;

const express = require('express');
const {
  getDestinations,
  getDestinationById,
  getFeaturedDestinations,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/:id', getDestinationById);
router.post('/', protect, admin, createDestination);
router.put('/:id', protect, admin, updateDestination);
router.delete('/:id', protect, admin, deleteDestination);

module.exports = router;

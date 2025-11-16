const express = require('express');
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.get('/subscribers', protect, admin, getAllSubscribers);

module.exports = router;

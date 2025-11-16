const Newsletter = require('../models/Newsletter');

const subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ message: 'Email already subscribed' });
      } else {
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = Date.now();
        existingSubscriber.unsubscribedAt = undefined;
        await existingSubscriber.save();
        return res.json({ message: 'Successfully re-subscribed to newsletter' });
      }
    }

    const subscriber = await Newsletter.create({ email, name });
    res.status(201).json({ message: 'Successfully subscribed to newsletter', subscriber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found' });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    res.json({ count: subscribers.length, subscribers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getAllSubscribers
};

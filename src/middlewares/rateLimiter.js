// src/middlewares/rateLimiter.js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const redis = require('../config/redisConfig');

// Rate limiter for 1 task per second and 20 tasks per minute
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rate-limiter',  // Prefix to store rate-limits
  points: 20,                 // 20 points (tasks) allowed per minute
  duration: 60,               // Duration in seconds (1 minute)
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // The user ID should be passed in the request body
    const { user_id } = req.body;

    // Check rate limit for this user
    await rateLimiter.consume(user_id);  // Consumes 1 point per request

    next();  // Proceed to the next middleware (or handler)
  } catch (err) {
    res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
};

module.exports = rateLimiterMiddleware;
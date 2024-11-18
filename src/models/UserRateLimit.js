const mongoose = require('mongoose');

const userRateLimitSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  requestCount: { type: Number, default: 0 },
  resetTime: { type: Date, required: true }
});

module.exports = mongoose.model('UserRateLimit', userRateLimitSchema);
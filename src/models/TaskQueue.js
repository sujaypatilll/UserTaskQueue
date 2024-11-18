const mongoose = require('mongoose');

const taskQueueSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'queued' } // Status could be 'queued', 'processing', or 'completed'
});

module.exports = mongoose.model('TaskQueue', taskQueueSchema);
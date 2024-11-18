// src/controllers/taskController.js
const redis = require('../config/redisConfig');
const logger = require('../utils/logger');

const handleTask = async (req, res) => {
  const { user_id } = req.body;

  // Add task to the Redis queue (list)
  const task = { userId: user_id, timestamp: Date.now() };
  await redis.lpush('taskQueue', JSON.stringify(task));  // LPUSH to add task to the queue

  res.status(202).json({ message: `Task queued for user ${user_id}` });
};

const processQueue = async () => {
  try {
    // Continuously process tasks from the Redis queue
    const taskJson = await redis.rpop('taskQueue');  // RPOP to get the task from the queue
    if (taskJson) {
      const task = JSON.parse(taskJson);
      // Simulate task processing and logging
      logger.info(`Task completed for user ${task.userId} at ${Date.now()}`);

      // After task completion, log the task (e.g., to a log file)
      // Simulate marking task as completed
    }
  } catch (err) {
    console.error('Error processing task queue:', err);
  }
};

// Process tasks every second
setInterval(processQueue, 1000);

module.exports = { handleTask };
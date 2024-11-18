// src/routes/taskRoutes.js
const express = require('express');
const { handleTask } = require('../controllers/taskController');
const rateLimiterMiddleware = require('../middlewares/rateLimiter');

const router = express.Router();

// POST route to create tasks with rate limiting
router.post('/task', rateLimiterMiddleware, handleTask);

module.exports = router;
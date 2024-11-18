// src/app.js
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
require('./config/redisConfig');  // Make sure Redis is connected before handling routes

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);  // Use the task routes

module.exports = app;
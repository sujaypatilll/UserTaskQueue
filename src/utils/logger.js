const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.File({ filename: 'task.log' }), // Save logs to file
    new transports.Console(), // Optional: Log to console
  ],
});

module.exports = logger;
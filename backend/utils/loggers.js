const winston = require('winston');
require('dotenv').config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log', maxsize: 5242880, maxFiles: 5 }),
    new winston.transports.Console()
  ]
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = logger;
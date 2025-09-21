const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const winston = require('winston');
require('dotenv').config();
const routes = require('./routes');
const config = require('./config/config');
const logger = require('./utils/logger');

// Configure le logger Winston
const logger = winston.createLogger({
  level: 'info', // Niveau de log : info, warn, error, etc.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log', maxsize: 5242880, maxFiles: 5 }), // 5MB max, 5 fichiers
    new winston.transports.Console() // Logs aussi dans la console
  ]
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

const app = express();
app.use(cors({ origin: config.baseUrl }));
app.use(express.json());

// Supabase client
const supabase = createClient(config.supabase.url, config.supabase.anonKey);

// Middleware pour logger chaque requête
app.use((req, res, next) => {
  logger.info('Request', { method: req.method, url: req.url, ip: req.ip });
  next();
});

// Routes
app.use('/api', routes);

// Error handling avec logs
app.use((err, req, res, next) => {
  logger.error('Error:', { message: err.message, stack: err.stack });
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(config.port, () => {
  logger.info(`API running on port ${config.port}`);
});

module.exports = { app, logger }; // Export pour réutilisation
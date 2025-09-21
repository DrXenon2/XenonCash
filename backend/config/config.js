require('dotenv').config();

const config = {
  // Server settings
  port: process.env.PORT || 3001,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    validate: () => {
      if (!config.supabase.url || !config.supabase.anonKey) {
        throw new Error('Supabase URL and Anon Key must be set in .env');
      }
    }
  },

  // Authentication settings
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_me',
    expiresIn: '1h',
    validate: () => {
      if (!config.jwt.secret || config.jwt.secret === 'default_secret_change_me') {
        console.warn('JWT_SECRET is not set or using default. Change it for security!');
      }
    }
  },

  // Flutterwave configuration
  flutterwave: {
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
    apiUrl: 'https://api.flutterwave.com/v3',
    validate: () => {
      if (!config.flutterwave.secretKey) {
        throw new Error('Flutterwave Secret Key must be set in .env');
      }
    }
  },

  // General settings
  minWithdrawal: 3000, // Minimum withdrawal amount in XOF
  defaultCurrency: 'XOF',

  // Validation au démarrage
  validate: () => {
    config.supabase.validate();
    config.jwt.validate();
    config.flutterwave.validate();
  }
};

// Valide les configurations au chargement
config.validate();

module.exports = config;
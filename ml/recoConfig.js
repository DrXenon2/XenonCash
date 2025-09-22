// /storage/emulated/0/Documents/XenonCash/XenonCash/ml/recoConfig.js
const recoConfig = {
  // Chemins vers les données
  dataPaths: {
    earningsData: '../data/earnings_data.csv',
    userActivity: '../data/user_activity.json',
  },

  // Paramètres de l'algorithme
  algorithm: {
    type: 'collaborative_filtering', // Type d'algorithme (peut être étendu à 'content_based')
    topN: 3, // Nombre de recommandations par utilisateur
    weightFactors: {
      conversions: 0.6, // Poids des conversions
      activityScore: 0.4, // Poids de l'activité (login_count)
    },
    minClicksThreshold: 50, // Seuil minimum de clics pour une recommandation
  },

  // Offres disponibles (à personnaliser)
  offers: [
    {
      id: 1,
      name: 'High Traffic Offer',
      minClicks: 200,
      payout: 1000,
    },
    {
      id: 2,
      name: 'Conversion Boost',
      minClicks: 100,
      payout: 500,
    },
    {
      id: 3,
      name: 'Low Effort Offer',
      minClicks: 50,
      payout: 250,
    },
  ],

  // Options de logging
  logging: {
    enabled: true,
    level: 'info', // 'debug', 'info', 'error'
  },

  // Paramètres d'optimisation
  optimization: {
    cacheRecommendations: true, // Mettre en cache pour éviter recalculs
    cacheTTL: 3600, // TTL en secondes (1 heure)
  },
};

// Export pour usage dans recoAlgo.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = recoConfig;
}
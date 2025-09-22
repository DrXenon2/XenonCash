// /storage/emulated/0/Documents/XenonCash/XenonCash/ml/recoAlgo.js
const fs = require('fs');
const path = require('path');

// Simuler un système de recommandation basé sur la collaboration (user-item matrix)
class RecommendationEngine {
  constructor() {
    this.dataPath = path.join(__dirname, 'data', 'earnings_data.csv');
    this.userActivityPath = path.join(__dirname, 'data', 'user_activity.json');
    this.recommendations = new Map();
  }

  // Charger les données CSV
  loadData() {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      const lines = data.trim().split('\n').slice(1); // Ignorer l'en-tête
      const matrix = new Map();

      lines.forEach(line => {
        const [date, userId, amount, clicks, conversions] = line.split(',');
        if (!matrix.has(userId)) matrix.set(userId, []);
        matrix.get(userId).push({ amount: parseFloat(amount), clicks: parseInt(clicks), conversions: parseInt(conversions) });
      });

      return matrix;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      return new Map();
    }
  }

  // Charger les activités utilisateur
  loadUserActivity() {
    try {
      const data = fs.readFileSync(this.userActivityPath, 'utf8');
      return JSON.parse(data).users;
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
      return [];
    }
  }

  // Algorithme de recommandation simple (basé sur les conversions et activité)
  generateRecommendations() {
    const userMatrix = this.loadData();
    const userActivity = this.loadUserActivity();
    const userScores = new Map();

    userActivity.forEach(user => {
      const userId = user.user_id.toString();
      const userData = userMatrix.get(userId) || [];
      const totalConversions = userData.reduce((sum, item) => sum + item.conversions, 0);
      const activityScore = user.login_count * 0.5; // Poids pour l'activité
      userScores.set(userId, totalConversions + activityScore);
    });

    // Trier par score et recommander aux utilisateurs actifs
    const sortedUsers = Array.from(userScores.entries()).sort((a, b) => b[1] - a[1]);
    sortedUsers.forEach(([userId], index) => {
      if (index < 3) { // Top 3 utilisateurs
        this.recommendations.set(userId, this.suggestOffers(userId, userMatrix));
      }
    });

    return this.recommendations;
  }

  // Suggestions d'offres basées sur l'historique
  suggestOffers(userId, matrix) {
    const userData = matrix.get(userId) || [];
    const avgClicks = userData.reduce((sum, item) => sum + item.clicks, 0) / userData.length || 0;
    const offers = [
      { id: 1, name: 'High Traffic Offer', minClicks: 200 },
      { id: 2, name: 'Conversion Boost', minClicks: 100 },
      { id: 3, name: 'Low Effort Offer', minClicks: 50 },
    ];

    return offers.filter(offer => avgClicks >= offer.minClicks).map(offer => offer.name);
  }

  // Exporter les recommandations
  getRecommendations() {
    if (this.recommendations.size === 0) this.generateRecommendations();
    return Object.fromEntries(this.recommendations);
  }
}

// Exemple d'utilisation
const recoEngine = new RecommendationEngine();
const recommendations = recoEngine.getRecommendations();
console.log('Recommandations:', recommendations);

// Pour une intégration future (e.g., API)
module.exports = { RecommendationEngine };
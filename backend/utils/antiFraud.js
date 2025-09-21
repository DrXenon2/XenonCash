const axios = require('axios');

const antiFraud = {
  // Vérifier si l'IP est suspecte (via service externe, e.g., ipstack)
  checkIp: async (ip) => {
    try {
      const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=your_ipstack_key`, {
        // Remplace 'your_ipstack_key' par une clé gratuite (optionnel)
      });
      const { country_code, is_proxy } = response.data;
      return !is_proxy && country_code === 'CM'; // Exemple : accepte seulement Cameroun
    } catch (err) {
      console.warn('IP check failed, skipping:', err.message);
      return true; // Passe si API down
    }
  },

  // Vérifier la fréquence des requêtes (limite basique)
  checkRateLimit: (req, limit = 100) => {
    // Implémentation simple : à améliorer avec Redis ou mémoire
    const now = Date.now();
    if (!req.session) req.session = {};
    req.session.lastRequests = req.session.lastRequests || [];
    req.session.lastRequests = req.session.lastRequests.filter(t => now - t < 3600000); // 1h
    if (req.session.lastRequests.length >= limit) throw new Error('Rate limit exceeded');
    req.session.lastRequests.push(now);
    return true;
  }
};

module.exports = antiFraud;
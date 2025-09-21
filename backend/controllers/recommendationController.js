const RecommendationModel = require('../models/recommendationModel');

exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendations = await RecommendationModel.getRecommendationsByPrefs(userId);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { preferences } = req.body;
    const updatedPrefs = await RecommendationModel.upsertUserPrefs(userId, preferences);
    res.json(updatedPrefs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateFromInteraction = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const updatedPrefs = await RecommendationModel.updatePrefsFromInteraction(userId, productId);
    res.json(updatedPrefs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
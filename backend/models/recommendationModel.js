const supabase = require('../utils/supabase');

const RecommendationModel = {
  // Créer ou mettre à jour les préférences d'un utilisateur
  upsertUserPrefs: async (userId, preferences) => {
    const { data, error } = await supabase
      .from('user_prefs')
      .upsert({ user_id: userId, preferences }, { onConflict: 'user_id' })
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer les préférences d'un utilisateur
  getUserPrefs: async (userId) => {
    const { data, error } = await supabase
      .from('user_prefs')
      .select('preferences')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message); // PGRST116 = pas de ligne
    return data?.preferences || {};
  },

  // Récupérer des recommandations basées sur les préférences
  getRecommendationsByPrefs: async (userId) => {
    const prefs = await RecommendationModel.getUserPrefs(userId);
    const niches = prefs?.niches || [];

    let query = supabase.from('products').select('*').eq('active', true);

    if (niches.length > 0) {
      query = query.in('niche', niches); // Filtre par niches préférées
    } else {
      // Fallback : produits les plus populaires (basé sur transactions)
      const { data: popular } = await supabase
        .from('transactions')
        .select('product_id, count', { count: 'exact' })
        .group('product_id')
        .order('count', { ascending: false })
        .limit(5);
      const popularIds = popular.map(p => p.product_id);
      query = supabase.from('products').select('*').in('id', popularIds);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour les préférences avec une interaction (e.g., clic sur produit)
  updatePrefsFromInteraction: async (userId, productId) => {
    const { data: product, error: prodErr } = await supabase
      .from('products')
      .select('niche')
      .eq('id', productId)
      .single();
    if (prodErr) throw new Error(prodErr.message);

    const { data: prefs, error: prefsErr } = await supabase
      .from('user_prefs')
      .select('preferences')
      .eq('user_id', userId)
      .single();
    if (prefsErr && prefsErr.code !== 'PGRST116') throw new Error(prefsErr.message);

    const currentPrefs = prefs?.preferences?.niches || [];
    const newPrefs = [...new Set([...currentPrefs, product.niche])]; // Ajoute niche sans doublons

    return await RecommendationModel.upsertUserPrefs(userId, { niches: newPrefs });
  }
};

module.exports = RecommendationModel;
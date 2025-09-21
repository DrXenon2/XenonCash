const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Schema Supabase à ajouter (via SQL editor)
const initPrefsTable = `
  CREATE TABLE user_prefs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preferences JSONB DEFAULT '{}',  -- e.g., {"niches": ["business", "tech"]}
    created_at TIMESTAMP DEFAULT NOW()
  );
`;
// Exécute ça une fois dans Supabase

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'User ID required' });

  // Récupère les préférences utilisateur
  const { data: prefs, error: prefsErr } = await supabase
    .from('user_prefs')
    .select('preferences')
    .eq('user_id', userId)
    .single();

  if (prefsErr && prefsErr.code !== 'PGRST116') return res.status(500).json({ error: prefsErr.message });

  const niches = prefs?.preferences?.niches || [];
  let query = supabase.from('products').select('*').eq('active', true);

  if (niches.length) {
    query = query.in('niche', niches); // Assume 'niche' column in products
  } else {
    // Fallback : produits populaires (basé sur transactions)
    const { data: popular } = await supabase
      .from('transactions')
      .select('product_id, count', { count: 'exact' })
      .group('product_id')
      .order('count', { ascending: false })
      .limit(5);
    const popularIds = popular.map(p => p.product_id);
    query = supabase.from('products').select('*').in('id', popularIds);
  }

  const { data: recommendations, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  res.json(recommendations);
});

// Mettre à jour les préférences (e.g., via frontend)
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { preferences } = req.body;
  const { data, error } = await supabase
    .from('user_prefs')
    .upsert({ user_id: userId, preferences }, { onConflict: 'user_id' })
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;
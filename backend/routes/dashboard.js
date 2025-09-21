const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'User ID required' });

  const { data: user, error: userErr } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();

  if (userErr) return res.status(500).json({ error: userErr.message });
  
const { getDashboardStats } = require('../controllers/dashboardController');
router.get('/', getDashboardStats);

  const { data: stats, error: statsErr } = await supabase.rpc('get_affiliate_stats', { user_id: userId });
  if (statsErr) return res.status(500).json({ error: statsErr.message });

  res.json({
    balance: user.balance,
    sales: stats[0]?.sales || 0,
    leads: stats[0]?.leads || 0,
    referrals: stats[0]?.referrals || 0
  });
});

// Supabase RPC (create this function in Supabase SQL editor)
module.exports = router;
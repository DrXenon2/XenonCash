const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/', async (req, res) => {
  const { affiliate_id, product_id, type, amount } = req.body;
  const { data, error } = await supabase.from('transactions').insert({
    affiliate_id, product_id, type, amount, status: 'pending'
  }).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

router.get('/:affiliateId', async (req, res) => {
  const { affiliateId } = req.params;
  const { data, error } = await supabase.from('transactions').select('*').eq('affiliate_id', affiliateId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
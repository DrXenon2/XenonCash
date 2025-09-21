const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').eq('active', true);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { name, description, commission_rate, price } = req.body;
  const { data, error } = await supabase.from('products').insert({
    name, description, commission_rate, price, active: true
  }).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;
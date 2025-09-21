const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/', async (req, res) => {
  const { userId, amount, method, phone } = req.body;
  const { data: user, error: userErr } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();
  if (userErr || user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

  const { data, error } = await supabase.from('withdrawals').insert({
    user_id: userId, amount, method, status: 'pending'
  }).select();
  if (error) return res.status(400).json({ error: error.message });
  const withdrawId = data[0].id;

  const response = await axios.post('https://api.flutterwave.com/v3/transfers', {
    account_bank: 'MOMO', // Dynamique via method/country
    account_number: phone,
    amount,
    currency: 'XOF',
    narration: 'AfriLink Pro Withdrawal',
  }, {
    headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` }
  });

  await supabase.from('withdrawals').update({ transaction_id: response.data.data.id }).eq('id', withdrawId);
  await supabase.from('users').update({ balance: user.balance - amount }).eq('id', userId);

  res.json({ success: true, tx_id: response.data.data.id });
});

module.exports = router;
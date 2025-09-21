const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/register', async (req, res) => {
  const { username, email, phone, country, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, phone, country } }
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'User registered, check email for confirmation', user: data.user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: data.user });
});

module.exports = router;
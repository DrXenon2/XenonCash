const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { username, email, phone, country, password } = req.body;
    const user = await UserModel.createUser(username, email, phone, country, password);
    const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    const token = jwt.sign({ userId: data.user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.json({ token, user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
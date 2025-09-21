const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const socketIO = require('socket.io');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Schema Supabase (déjà dans précédent message)
const initChatTable = `
  CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;
// Exécute une fois dans Supabase SQL editor

// Fonction simple pour générer des réponses (à personnaliser)
const getAIResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('promote')) return "To promote a product, share your referral link on WhatsApp or Instagram with a clear call-to-action!";
  if (lowerMsg.includes('withdraw')) return "To withdraw, go to the Withdrawals page, enter your mobile number, and request at least 500 XOF.";
  if (lowerMsg.includes('help')) return "Need help? Check our FAQ or contact support at support@afrilinkpro.com.";
  return "I'm here to help! Ask me about promotions, withdrawals, or offers.";
};

// Route POST pour envoyer un message
router.post('/', async (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) return res.status(400).json({ error: 'User ID and message required' });

  const response = getAIResponse(message);

  // Stocke dans DB
  const { data, error } = await supabase.from('chat_history').insert({
    user_id: userId,
    message,
    response
  });
  if (error) console.error('Chat history save failed:', error);

  // Réponse immédiate
  res.json({ message, response });

  // Émettre via Socket.io (si serveur supporte)
  if (io) io.emit('chat_response', { userId, message, response });
});

// Route GET pour historique
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('chat_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;

// Initialisation Socket.io (à ajouter dans server.js si realtime voulu)
const io = socketIO(server);  // Ajoute dans server.js avec `const server = app.listen(...)`
io.on('connection', (socket) => {
  console.log('User connected to chat');
  socket.on('chat_message', (data) => {
    const response = getAIResponse(data.message);
    socket.emit('chat_response', { userId: data.userId, message: data.message, response });
  });
});
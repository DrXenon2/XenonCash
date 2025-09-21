const ChatModel = require('../models/chatModel'); // À créer si séparé, sinon utilise supabase direct

exports.sendMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const response = getAIResponse(message); // Fonction locale (voir ci-dessous)

    const { data, error } = await supabase.from('chat_history').insert({
      user_id: userId,
      message,
      response
    });
    if (error) throw new Error(error.message);

    res.json({ message, response });

    // Émettre via Socket.io si activé
    if (io) io.emit('chat_response', { userId, message, response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase.from('chat_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fonction locale pour réponses AI (à déplacer dans utils si réutilisé)
const getAIResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('promote')) return "Share your referral link on WhatsApp or Instagram!";
  if (lowerMsg.includes('withdraw')) return "Go to Withdrawals, enter your number, and request 500+ XOF.";
  if (lowerMsg.includes('help')) return "Check FAQ or email support@afrilinkpro.com.";
  return "Ask me about promotions or withdrawals!";
};
const supabase = require('../utils/supabase');

const WithdrawalModel = {
  // Créer une demande de retrait
  createWithdrawal: async (userId, amount, method) => {
    const { data, error } = await supabase.from('withdrawals').insert({
      user_id: userId,
      amount,
      method,
      status: 'pending'
    }).select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer les retraits par userId
  getWithdrawalsByUser: async (userId) => {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour le statut d'un retrait
  updateWithdrawalStatus: async (withdrawalId, status, transactionId) => {
    const { data, error } = await supabase
      .from('withdrawals')
      .update({ status, transaction_id: transactionId })
      .eq('id', withdrawalId)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Vérifier si retrait possible (solde suffisant)
  checkWithdrawalEligibility: async (userId, amount) => {
    const { data, error } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();
    if (error) throw new Error(error.message);
    return data.balance >= amount;
  }
};

module.exports = WithdrawalModel;
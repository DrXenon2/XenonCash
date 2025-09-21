const supabase = require('../utils/supabase');

const TransactionModel = {
  // Créer une transaction
  createTransaction: async (affiliateId, productId, type, amount) => {
    const { data, error } = await supabase.from('transactions').insert({
      affiliate_id: affiliateId,
      product_id: productId,
      type,
      amount,
      status: 'pending'
    }).select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer les transactions par affiliateId
  getTransactionsByAffiliate: async (affiliateId) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('affiliate_id', affiliateId);
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour le statut d'une transaction
  updateTransactionStatus: async (transactionId, status) => {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', transactionId)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer transactions approuvées (pour stats)
  getApprovedTransactions: async (affiliateId) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type')
      .eq('affiliate_id', affiliateId)
      .eq('status', 'approved');
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = TransactionModel;
const supabase = require('../utils/supabase');

const AffiliateModel = {
  // Créer un affilié
  createAffiliate: async (userId, referralCode, refParentId) => {
    const { data, error } = await supabase.from('affiliates').insert({
      user_id: userId,
      referral_code: referralCode,
      ref_parent_id: refParentId
    }).select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer un affilié par userId
  getAffiliateByUserId: async (userId) => {
    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour le total des referrals
  updateReferralCount: async (affiliateId, count) => {
    const { data, error } = await supabase
      .from('affiliates')
      .update({ total_referrals: count })
      .eq('id', affiliateId)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer les downlines (referrals directs)
  getDownlines: async (affiliateId) => {
    const { data, error } = await supabase
      .from('affiliates')
      .select('user_id, referral_code')
      .eq('ref_parent_id', affiliateId);
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = AffiliateModel;
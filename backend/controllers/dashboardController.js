const UserModel = require('../models/userModel');
const AffiliateModel = require('../models/affiliateModel');
const TransactionModel = require('../models/transactionModel');
const config = require('../config/config');

exports.getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await UserModel.getUserById(userId);
    const affiliate = await AffiliateModel.getAffiliateByUserId(userId);
    const transactions = await TransactionModel.getApprovedTransactions(affiliate.id);

    const stats = {
      balance: user.balance,
      sales: transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0),
      leads: transactions.filter(t => t.type === 'lead').reduce((sum, t) => sum + t.amount, 0),
      referrals: transactions.filter(t => t.type === 'referral').reduce((sum, t) => sum + t.amount, 0)
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
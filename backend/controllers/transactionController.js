const AffiliateModel = require('../models/affiliateModel');
const TransactionModel = require('../models/transactionModel');

exports.createTransaction = async (req, res) => {
  try {
    const { userId, productId, type, amount } = req.body;
    const affiliate = await AffiliateModel.getAffiliateByUserId(userId);
    const transaction = await TransactionModel.createTransaction(affiliate.id, productId, type, amount);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.query;
    const affiliate = await AffiliateModel.getAffiliateByUserId(userId);
    const transactions = await TransactionModel.getTransactionsByAffiliate(affiliate.id);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
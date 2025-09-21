const UserModel = require('../models/userModel');
const WithdrawalModel = require('../models/withdrawalModel');
const axios = require('axios');
const config = require('../config/config');

exports.requestWithdrawal = async (req, res) => {
  try {
    const { userId, amount, method, phone } = req.body;
    if (amount < config.minWithdrawal) throw new Error(`Minimum withdrawal is ${config.minWithdrawal} ${config.defaultCurrency}`);

    const isEligible = await WithdrawalModel.checkWithdrawalEligibility(userId, amount);
    if (!isEligible) throw new Error('Insufficient balance');

    const withdrawal = await WithdrawalModel.createWithdrawal(userId, amount, method);

    const response = await axios.post(`${config.flutterwave.apiUrl}/transfers`, {
      account_bank: 'MOMO', // Dynamique via method/country
      account_number: phone,
      amount,
      currency: config.defaultCurrency,
      narration: 'AfriLink Pro Withdrawal',
    }, {
      headers: { Authorization: `Bearer ${config.flutterwave.secretKey}` }
    });

    await WithdrawalModel.updateWithdrawalStatus(withdrawal.id, 'processing', response.data.data.id);
    await UserModel.updateBalance(userId, user.balance - amount); // Ajuster avec solde actuel

    res.json({ success: true, tx_id: response.data.data.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getWithdrawals = async (req, res) => {
  try {
    const { userId } = req.query;
    const withdrawals = await WithdrawalModel.getWithdrawalsByUser(userId);
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const axios = require('axios');
const config = require('../config/config');

const flutterwave = {
  // Initier un transfert
  initiateTransfer: async (accountNumber, amount, narration, method = 'MOMO') => {
    try {
      const response = await axios.post(`${config.flutterwave.apiUrl}/transfers`, {
        account_bank: method,
        account_number: accountNumber,
        amount,
        currency: config.defaultCurrency,
        narration,
      }, {
        headers: { Authorization: `Bearer ${config.flutterwave.secretKey}` }
      });
      return response.data;
    } catch (err) {
      throw new Error(`Flutterwave Error: ${err.response?.data?.message || err.message}`);
    }
  },

  // Vérifier le statut d'une transaction
  checkTransferStatus: async (transactionId) => {
    try {
      const response = await axios.get(`${config.flutterwave.apiUrl}/transfers/${transactionId}`, {
        headers: { Authorization: `Bearer ${config.flutterwave.secretKey}` }
      });
      return response.data;
    } catch (err) {
      throw new Error(`Flutterwave Status Error: ${err.response?.data?.message || err.message}`);
    }
  }
};

module.exports = flutterwave;
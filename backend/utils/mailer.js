const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Remplace par ton service (e.g., SendGrid, ou SMTP perso)
  auth: {
    user: process.env.EMAIL_USER, // Ajoute dans .env
    pass: process.env.EMAIL_PASS  // Ajoute dans .env
  }
});

const mailer = {
  // Envoyer un email
  sendEmail: async (to, subject, text) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (err) {
      console.error('Email failed:', err.message);
      throw new Error('Failed to send email');
    }
  },

  // Exemple : Notification de retrait
  notifyWithdrawal: async (userEmail, amount, txId) => {
    const subject = 'Withdrawal Request Processed';
    const text = `Your withdrawal of ${amount} ${config.defaultCurrency} (TX ID: ${txId}) has been processed. Check your account for details.`;
    return await mailer.sendEmail(userEmail, subject, text);
  }
};

module.exports = mailer;
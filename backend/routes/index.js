const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/dashboard', require('./dashboard'));
router.use('/offers', require('./offers'));
router.use('/transactions', require('./transactions'));
router.use('/withdraw', require('./withdrawals'));

module.exports = router;
const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const transactionsController = require('./transactionsController');

const router = express.Router();

/**
 * Add routes
 */
router.post('/', transactionsController.addTransaction);
router.get('/:transactionId', transactionsController.getTransaction);
router.put('/:transactionId', transactionsController.updateTransactionStatus);

module.exports = router;

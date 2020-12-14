const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const wholesalerController = require('./wholesalerController');

const router = express.Router();

/**
 * Add routes
 */
router.get('/:userId', wholesalerController.getWholesaler);
router.put('/edit/:userId', wholesalerController.updateWholesaler);

module.exports = router;

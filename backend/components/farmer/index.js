const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const farmerController = require('./farmerController');

const router = express.Router();

/**
 * Add routes
 */
 router.get('/:userId', farmerController.getFarmer);
 router.put('/edit/:userId', farmerController.updateFarmer);

module.exports = router;

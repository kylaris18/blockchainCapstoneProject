const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const farmerController = require('./farmerController');

const router = express.Router();

/**
 * Set up logging
 */

// const logger = log4js.getLogger('routes - user-enrollment');
// logger.level = config.logLevel;
// logger.debug('setting up /user-enrollment route');
// console.log('routes - user-enrollment');


/**
 * Add routes
 */
router.put('/edit/:userId', farmerController.updateFarmer);

module.exports = router;

const express = require('express');
// const log4js = require('log4js');
// const config = require('config');

const errorHandler = require('../middlewares/error-handler');
const authHandler = require('../middlewares/authentication-handler');

const app = express();

const health = require('./health');
const userEnrollment = require('./user-enrollment');
const accessToken = require('./access-token');
const farmer = require('./farmer');
const wholesaler = require('./wholesaler');
const transactions = require('./transactions');
const goods = require('./goods');
const reviews = require('./reviews');

const router = express.Router();

/**
 * Set up logging
 
const logger = log4js.getLogger('routes - index');
logger.level = config.logLevel;
*/

/**
 * Error handler
 */
app.use(errorHandler.catchNotFound);
app.use(errorHandler.handleError);


/**
 * Add routes
 */
router.use('/health', health);
router.use('/user',userEnrollment);
router.use('/token',accessToken);
router.use(authHandler.authenticateUser);
router.use('/farmer',farmer);
router.use('/wholesaler',wholesaler);
router.use('/transactions',transactions);
router.use('/goods',goods);
router.use('/reviews',reviews);

module.exports = router;

const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const reviewsController = require('./reviewsController');

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
 
router.post('/', reviewsController.addReviews);
router.get('/', reviewsController.getReviews);
router.get('/:reviewId', reviewsController.getReviewsById);
router.get('/user/:userId', reviewsController.getReviewsByUser);
router.get('/reviewer/:reviewerId', reviewsController.getReviewsByReviewer);
router.put('/:reviewsId', reviewsController.updateReviews);

module.exports = router;

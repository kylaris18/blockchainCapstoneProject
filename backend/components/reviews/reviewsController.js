// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const reviews = require('./reviewsModel')

// const logger = log4js.getLogger('controllers - userEnrollment');
// logger.level = config.logLevel;
// console.log('controllers - userEnrollment');

/**
 * Controller object
 */
const reviewsController = {};

reviewsController.addReviews = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    
    try {
        let created = await reviews.create({
            userId:     req.body.userId,
            reviewerId: req.body.reviewerId,
            score:      req.body.score || '',
            reviewDesc: req.body.reviewDesc || ''
        })

        if(!created) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to record review.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Review recorded successfully.'
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};

reviewsController.getReviews = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let reviewsTransaction = await reviews.findAll();

        if(reviewsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to retrieve review.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: reviewsTransaction
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};

reviewsController.getReviewsById = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let reviewsTransaction = await reviews.findByPk(req.params.reviewId);

        if(reviewsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to retrieve record.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: reviewsTransaction
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};

reviewsController.getReviewsByUser = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let reviewsTransaction = await reviews.findAll({
          where: {
            userId: req.params.userId
          }
        });

        if(reviewsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to find records.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: reviewsTransaction
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};
reviewsController.getReviewsByReviewer = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let reviewsTransaction = await reviews.findAll({
          where: {
            reviewerId: req.params.reviewerId
          }
        });

        if(reviewsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to find records.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: reviewsTransaction
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};

reviewsController.updateReviews = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let reviewId = req.params.reviewId;
        let reviewsTransaction = await reviews.update(req.body, {
          where: {
            reviewId: reviewId
          }
        });

        if(!reviewsTransaction) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to update records.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Record updated successfully.'
            }; 
        }
    } catch(error) {
        jsonRes = {
            statusCode: 500,
            success: false,
            error: error,
        };
    } finally {
        util.sendResponse(res, jsonRes);    
    }
};

module.exports = reviewsController;
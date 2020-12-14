// const log4js = require('log4js');
// const config = require('config');
const Web3 = require('web3');
const Web3EthAbi = require('web3-eth-abi');
const CryptoJS = require("crypto-js");
const util = require('../../helpers/util');
const _ = require('lodash')

const contract = require('../../contracts/index')
const reviews = require('./reviewsModel')

/**
 * Controller object
 */
const reviewsController = {};

reviewsController.addReviews = async (req, res) => {
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
            let body = req.body;
            body.reviewDesc = "0x"+ CryptoJS.SHA1(body.reviewDesc).toString(CryptoJS.enc.Hex)

            let transactionData = Web3EthAbi.encodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'bytes'], [created.reviewId, body.userId, body.score, body.reviewerId, body.reviewDesc]);
            console.log(transactionData);
            contract.callReviews(transactionData)

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
            let body = reviewsTransaction.dataValues;
            ['createdAt', 'updatedAt'].forEach(e => delete body[e])
            
            body = {
                reviewId: body.reviewId.toString(),
                userId: body.userId.toString(),
                reviewerId: body.reviewerId.toString(),
                score: body.score.toString(),
                reviewDesc: "0x"+ CryptoJS.SHA1(body.reviewDesc).toString(CryptoJS.enc.Hex)
            }
            console.log("body:",body);
            let chainResponse = await contract.getReviews(req.params.reviewId) 
            let newbody = {
                reviewId: chainResponse.reviewId,
                userId: chainResponse.userId,
                reviewerId: chainResponse.reviewerId,
                score: chainResponse.score,
                reviewDesc: chainResponse.reviewDesc
            }
            console.log("newbody:",newbody);
            if(_.isEqual(body, newbody)) {
                jsonRes = {
                    statusCode: 200,
                    success: true,
                    body: reviewsTransaction
                }; 
            } else {
                jsonRes = {
                    statusCode: 500,
                    success: false,
                    message: 'Data returned is not identical to blockchain data'
                };
            }
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
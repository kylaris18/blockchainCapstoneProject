// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const Transaction = require('./transactionsModel')

// const logger = log4js.getLogger('controllers - userEnrollment');
// logger.level = config.logLevel;
// console.log('controllers - userEnrollment');

/**
 * Controller object
 */
const transactionsController = {};

transactionsController.addTransaction = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    let currentTime = Date.now();
    
    try {
        let [, created] = await Transaction.create({
            wholesalerId: req.body.wholesalerId || '',
            goodsId: req.body.goodsId || '',
            deliverySendDate: currentTime,
            deliveryDesc: req.body.deliveryDesc || ''
        })

        if(!created) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to record transaction.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Transaction recorded successfully.'
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

transactionsController.getTransaction = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let transaction = await Transaction.findByPk(req.params.transactionId);

        if(transaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to record transaction.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: transaction
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

module.exports = transactionsController;
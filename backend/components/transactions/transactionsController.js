// const log4js = require('log4js');
// const config = require('config');
const Web3 = require('web3');
const Web3EthAbi = require('web3-eth-abi');
const CryptoJS = require("crypto-js");
const _ = require('lodash')

const util = require('../../helpers/util');

const Transaction = require('./transactionsModel')

const contract = require('../../contracts/index')

/**
 * Controller object
 */
const transactionsController = {};

transactionsController.addTransaction = async (req, res) => {

    let jsonRes;    
    try {
        let deliverySendDate = new Date()
        deliverySendDate.setMilliseconds(0)
        
        let created = await Transaction.create({
            wholesalerId: req.body.wholesalerId || '',
            goodsId: req.body.goodsId || '',
            status: 1,
            deliveryDesc: req.body.deliveryDesc || '',
            deliverySendDate: deliverySendDate
        })

        if(!created) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to record transaction.'
            };
        } else {
            let body = req.body;
            body.deliverySendDate = Web3.utils.asciiToHex(created.deliverySendDate.toISOString());
            body.deliveryRecieveDate = Web3.utils.asciiToHex("");
            body.deliveryDesc = "0x"+ CryptoJS.SHA1(body.deliveryDesc).toString(CryptoJS.enc.Hex)

            let transactionData = Web3EthAbi.encodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'bytes', 'bytes', 'bytes'], [created.transactionId, body.wholesalerId, body.goodsId, 1, body.deliverySendDate, body.deliveryRecieveDate, body.deliveryDesc]);

            contract.callTransaction(transactionData)

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

    let jsonRes;
    try {
        let transaction = await Transaction.findByPk(req.params.transactionId);
        if(transaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to find transaction.'
            };
        } else {
            let body = transaction.dataValues;
            ['createdAt', 'updatedAt'].forEach(e => delete body[e])
            
            body = {
                transactionId: body.transactionId.toString(),
                wholesalerId: body.wholesalerId.toString(),
                goodsId: body.goodsId.toString(),
                status: body.status.toString(),
                deliverySendDate: Web3.utils.asciiToHex(body.deliverySendDate.toISOString()),
                deliveryRecieveDate: Web3.utils.asciiToHex(body.deliveryRecieveDate),
                deliveryDesc: "0x"+ CryptoJS.SHA1(body.deliveryDesc).toString(CryptoJS.enc.Hex)
            }
            
            let chainResponse = await contract.getTransaction(req.params.transactionId) 
            let newbody = {
                transactionId: chainResponse.transactionId,
                wholesalerId: chainResponse.wholesalerId,
                goodsId: chainResponse.goodsId,
                status: chainResponse.status,
                deliverySendDate: chainResponse.deliverySendDate,
                deliveryRecieveDate: chainResponse.deliveryReceiveDate,
                deliveryDesc: chainResponse.deliveryDesc
            }

            if(_.isEqual(body, newbody)) {
                jsonRes = {
                    statusCode: 200,
                    success: true,
                    body: transaction._previousDataValues
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

transactionsController.updateTransactionStatus = async (req, res) => {

    let jsonRes;
    try {
        let body = req.body
        if(body.status === 5)
            body.deliveryRecieveDate = new Date()
            body.deliveryRecieveDate = body.deliveryRecieveDate.toISOString()
        let updated = await Transaction.update(
            body, 
            {
                where: { transactionId: req.params.transactionId }
            }
        ) 

        let transaction = await Transaction.findByPk(req.params.transactionId);
        if(updated == 0) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to find transaction.'
            };
        } else {
            let data = transaction.dataValues;
            body.deliverySendDate = Web3.utils.asciiToHex(data.deliverySendDate.toISOString());
            body.deliveryRecieveDate = Web3.utils.asciiToHex(body.deliveryRecieveDate);
            body.deliveryDesc = "0x"+ CryptoJS.SHA1(data.deliveryDesc).toString(CryptoJS.enc.Hex)

            let transactionData = Web3EthAbi.encodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'bytes', 'bytes', 'bytes'], [data.transactionId, data.wholesalerId, data.goodsId, body.status, body.deliverySendDate, body.deliveryRecieveDate, body.deliveryDesc]);

            contract.callTransaction(transactionData)

            jsonRes = {
                statusCode: 200,
                success: true,
                message: "Transaction status updated successfully"
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
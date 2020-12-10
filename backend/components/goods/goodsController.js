// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const goods = require('./goodsModel')

// const logger = log4js.getLogger('controllers - userEnrollment');
// logger.level = config.logLevel;
// console.log('controllers - userEnrollment');

/**
 * Controller object
 */
const goodsController = {};

goodsController.addGoods = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    
    try {
        let created = await goods.create({
            farmerId:       req.body.farmerId || '',
            goodsName:      req.body.goodsName || '',
            quantityType:   req.body.quantityType || '',
            quantityValue:  req.body.quantityValue || '',
            amountPerUnit:  req.body.amountPerUnit || '',
            amount:         req.body.amount || '',
            additionalDesc: req.body.additionalDesc || '',
            plantationDate: req.body.plantationDate || '',
            harvestDate:    req.body.harvestDate || ''
        })

        if(!created) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to record goods.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Goods recorded successfully.'
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

goodsController.getGoods = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let goodsTransaction = await goods.findAll();

        if(goodsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to retrieve record.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: goodsTransaction
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

goodsController.getGoodsById = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let goodsTransaction = await goods.findByPk(req.params.goodsId);

        if(goodsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to retrieve record.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: goodsTransaction
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

goodsController.getGoodsByFarmer = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let goodsTransaction = await goods.findAll({
          where: {
            farmerId: req.params.farmerId
          }
        });

        if(goodsTransaction === null) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to find records.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                body: goodsTransaction
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

goodsController.updateGoods = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let goodsId = req.params.goodsId;
        let goodsTransaction = await goods.update(req.body, {
          where: {
            goodsId: goodsId
          }
        });

        if(!goodsTransaction) {
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

goodsController.deleteGoods = async (req, res) => {
    // logger.info('inside userEnroll()...');
    // console.log('inside userEnroll()...');

    let jsonRes;
    try {
        let goodsId = req.params.goodsId;
        let goodsTransaction = await goods.destroy({
          where: {
            goodsId: goodsId
          }
        });

        if(!goodsTransaction) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Unable to delete record.'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Record deleted successfully.'
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

module.exports = goodsController;
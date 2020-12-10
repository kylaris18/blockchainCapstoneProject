const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const goodsController = require('./goodsController');

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
 
router.post('/', goodsController.addGoods);
router.get('/', goodsController.getGoods);
router.get('/:goodsId', goodsController.getGoodsById);
router.get('/farmer/:farmerId', goodsController.getGoodsByFarmer);
router.put('/:goodsId', goodsController.updateGoods);
router.delete('/:goodsId', goodsController.deleteGoods);

module.exports = router;

// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const Wholesaler = require('./wholesalerModel');

// const logger = log4js.getLogger('controllers - wholesaler');
// logger.level = config.logLevel;
// console.log('controllers - wholesaler');

/**
 * Controller object
 */
const wholesaler = {};

wholesaler.updateWholesaler = async (req, res) => {
    // logger.info('inside updateWholesaler()...');

    let jsonRes;
    
    try {
        let updated = await Wholesaler.update(
            req.body, 
            {
                where: { userId: req.params.userId }
            }
        ) 

        if(updated == 0) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'No user data updated'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: "Wholesaler details updated successfully"
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

module.exports = wholesaler;
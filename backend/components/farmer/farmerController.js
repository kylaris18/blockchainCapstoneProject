// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const Farmer = require('./farmerModel')

// const logger = log4js.getLogger('controllers - farmer');
// logger.level = config.logLevel;
// console.log('controllers - farmer');

/**
 * Controller object
 */
const farmer = {};

farmer.updateFarmer = async (req, res) => {
    // logger.info('inside updateFarmer()...');

    let jsonRes;
    
    try {
        let updated = await Farmer.update(
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
                message: "Farmer details updated successfully"
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

module.exports = farmer;
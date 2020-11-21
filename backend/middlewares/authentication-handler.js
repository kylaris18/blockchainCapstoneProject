const log4js = require('log4js');
const config = require('config');
const jwt = require('jsonwebtoken');
const util = require('../helpers/util');

/**
 * Set up logging
 */
const logger = log4js.getLogger('authentication handler');
logger.level = config.logLevel;

/**
 * auth Handler object
 */
const authHandler = {};


/**
 * auth handler function
 */
authHandler.authenticateUser = (req, res, next) => {
    // logger.debug('authenticateUser handler...');
    // console.log('authenticateUser handler...');
    let token = req.headers.authorization;
    if (!token) {
        jsonRes = {
            errors: [{
                code: 401,
                message: 'No token provided.'
            }],
            statusCode: 401
        };
        util.sendResponse(res, jsonRes);
    } else {
        token = token.split(" ")[1];
        jwt.verify(token, config.token.secret, function (err, decoded) {
            if (err) {
                jsonRes = {
                    errors: [{
                        code: 401,
                        message: 'User unauthorized'
                    }],
                    statusCode: 401
                };
                util.sendResponse(res, jsonRes);
            } else {
                // console.log('User authenticated');
                logger.debug('User authenticated');
                res.locals.user = decoded;
                next();
            }
        });
    }
};

module.exports = authHandler;
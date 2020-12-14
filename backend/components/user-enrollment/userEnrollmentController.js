// const log4js = require('log4js');
// const config = require('config');
const util = require('../../helpers/util');

const User = require('./userEnrollmentModel')
const Farmer = require('../farmer/farmerModel')
const Wholesaler = require('../wholesaler/wholesalerModel')

/**
 * Controller object
 */
const userEnrollment = {};

userEnrollment.userEnroll = async (req, res) => {
    let jsonRes;

    const salt = util.getSalt();
    const passwordHash = util.hashPassword(req.body.password, salt);

    let body = req.body
    
    try {
        if(body.role === 'farmer' || body.role === 'wholesaler') {
            let [usr, usrcreated] = await User.findOrCreate({
                where: { username: req.body.username },
                defaults: {
                    username: body.username,
                    password: passwordHash,
                    salt: salt
                }
            })
    
            if(!usrcreated) {
                jsonRes = {
                    statusCode: 400,
                    success: false,
                    message: 'Username already exists'
                };
            } else {
                ['username', 'password'].forEach(e => delete body[e])
                body.userId = usr.userId
    
                let created = false
                if(body.role === 'farmer') {
                    let frmrcreated = await Farmer.create(body)
    
                    if(frmrcreated) {
                        created = true
                    }
                } else if(body.role === 'wholesaler') {
                    let whlslrcreated = await Wholesaler.create(body)
    
                    if(whlslrcreated) {
                        created = true
                    }
                } 
    
                if(!created) {
                    jsonRes = {
                        statusCode: 400,
                        success: false,
                        message: 'Error in enrolling user'
                    };
                } else {
                    jsonRes = {
                        statusCode: 200,
                        success: true,
                        message: 'User enrolled successfully'
                    }; 
                }
            }
        } else {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'Invalid role'
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

userEnrollment.updateUsername = async (req, res) => {
    let jsonRes;
    
    try {
        let updated = await User.update(
            { 
                username: req.body.username
            }, {
                where: { userId: req.params.userId }
            }
        ) 

        if(updated == 0) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'No user data changed'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: "Username changed successfully"
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

userEnrollment.updatePassword = async (req, res) => {
    let jsonRes;

    const salt = util.getSalt();
    const passwordHash = util.hashPassword(req.body.password, salt);
    
    try {
        let updated = await User.update(
            { 
                password: passwordHash,
                salt: salt
            }, {
                where: { userId: req.params.userId }
            }
        ) 

        if(updated == 0) {
            jsonRes = {
                statusCode: 400,
                success: false,
                message: 'No user data changed'
            };
        } else {
            jsonRes = {
                statusCode: 200,
                success: true,
                message: "Password changed successfully"
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
module.exports = userEnrollment;
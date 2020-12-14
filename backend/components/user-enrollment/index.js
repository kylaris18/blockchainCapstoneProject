const express = require('express');
// const log4js = require('log4js');
// const config = require('config')

const authHandler = require('../../middlewares/authentication-handler');

const userEnrollmentController = require('./userEnrollmentController');

const router = express.Router();

/**
 * Add routes
 */
router.post('/add', userEnrollmentController.userEnroll);
router.use(authHandler.authenticateUser);
router.put('/edit/:userId/username', userEnrollmentController.updateUsername);
router.put('/edit/:userId/password', userEnrollmentController.updatePassword);

module.exports = router;

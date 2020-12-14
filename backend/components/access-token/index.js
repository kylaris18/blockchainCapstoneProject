const express = require('express');
const accessTokenCtrl = require('./accessTokenController');

const router = express.Router();

/**
 * Add routes
 */
router.post('/', accessTokenCtrl.generateAccessToken);

module.exports = router;

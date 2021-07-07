const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/multiply', controller.multiply);

module.exports = router;

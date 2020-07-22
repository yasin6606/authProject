const express = require('express');
const router = express.Router();

const loginController = require('./../../../../controllers/login/loginControl');
const selfRegController = require('./../../../../controllers/selfReg/selfRegController');

router.post('/login', loginController.login);
router.post('/selfRegister', selfRegController.selfReg);

module.exports = router;
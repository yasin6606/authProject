const express = require('express');
const router = express.Router();

const admin = require('./admin');
const home = require('./home');
const login = require('./login');
const normalUser = require('./normalUser');

router.use('/admin', admin);
router.use('/', home);
router.use('/login', login);
router.use('/normalUser', normalUser);

module.exports = router;
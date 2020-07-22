const express = require('express');
const router = express.Router();

const version1 = require('./api/v1');

router.use("/api/v1", version1);

module.exports = router;
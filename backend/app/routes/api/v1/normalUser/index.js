const express = require('express');
const router = express();

const userInfoController = require('../../../../controllers/users/updateUserInfo/updateUserInfo');

router.post("/editInfo/:id", userInfoController.updateUserInfo);


module.exports = router;
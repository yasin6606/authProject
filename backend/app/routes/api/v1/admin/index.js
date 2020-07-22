const express = require('express');
const router = express();

// CURD
const userInfoController = require('../../../../controllers/users/userInfo/userInfo');
const newUserController = require('../../../../controllers/users/newUser/newUserControl');
const updateUserInfoController = require('../../../../controllers/users/updateUserInfo/updateUserInfo');
const deleteUserController = require('../../../../controllers/users/deleteUser/deleteUser');

// define new access level
const defineNewAccessLevelController = require('../../../../controllers/accessLevels/accessLevelsControl');

// define new role
const defineNewRoleController = require('../../../../controllers/roles/roles');

// define new option
const defineOptionsController = require('../../../../controllers/options/defineOptions');



// CURD
router.get("/usersInfo", userInfoController.showUsersInfo);
router.get("/singleUserInfo/:id", userInfoController.showSingleUserInfo);
router.get("/usersDelWaitingInfo", userInfoController.usersDelWaitingInfo);
router.post("/newUser", newUserController.addNewUser);
router.post("/supplementaryReg", newUserController.supplementaryReg);
router.put("/updateUserInfo/:id", updateUserInfoController.updateUserInfo);
router.put("/updatePassword/:id", updateUserInfoController.updatePassword);
router.delete("/logicalDeleteUser/:id", deleteUserController.logicalDeleteUser);
router.delete("/fullDeleteUser/:id", deleteUserController.deleteUser);
router.delete("/restoreUser/:id", deleteUserController.restore);

// accessLevels
router.post("/defineNewAccessLevel", defineNewAccessLevelController.defineNewAccLev);
router.get("/showAccessLevels", defineNewAccessLevelController.showAccLev);
router.delete("/deleteAccessLevels/:accLevId", defineNewAccessLevelController.deleteAccLev);

// roles
router.post("/defineNewRole", defineNewRoleController.defineRole);
router.get("/showGroupRoles", defineNewRoleController.showGroupRoles);
router.delete("/deleteRole/:roleAccRolesId/:roleId", defineNewRoleController.deleteRole);

// options
router.post("/defineNewOption", defineOptionsController.newOption);
router.get("/showOptions", defineOptionsController.showOptions);
router.delete("/deleteOption/:accOptModelId/:optionId", defineOptionsController.deleteOption);


module.exports = router;
const controller = require('../../controller');
const UserSchema = require('../../../model/models/Users');
const UserRoleSchema = require('../../../model/models/User-Role');
const bcrypt = require('bcryptjs');

const newUser = class newUserController extends controller {

    // add new user
    addNewUser = async (req, res, next) => {

        const regInfo = req.body;

        // hash password
        const hashPassword = await bcrypt.hash(regInfo.password, 12);

        // add user initial information
        const addUser = new UserSchema({
            firstName: regInfo.firstName,
            lastName: regInfo.lastName,
            nationalID: regInfo.nationalID,
            email: regInfo.email,
            password: hashPassword,
            gender: regInfo.gender,
            activity: regInfo.activity,
            roleId: regInfo.roleId,
        });

        const userAdded = await addUser.save();

        if (!userAdded) return res.json({ msg: "can not add new user" }).status(500);

        // if initial information was successfully added , add userId & roleId to User-Role model
        const userRole = new UserRoleSchema({
            userId: userAdded._id,
            roleId: req.body.roleId,
            logicalDeleting: false,
            activity: req.body.activity,
        });

        const userRoleSaved = await userRole.save();

        //send successfully alert for callback
        !userRoleSaved ? res.json().status(500) : res.json();
    };


    // self user supplementary register 
    supplementaryReg = async (req, res, next) => {
        const addSelfUser = new NewUserSchema({...req.body, user: req.body.userLoginId});

        const selfUserAdded = await addSelfUser.save();

        !selfUserAdded ? res.statusCode(500) : res.json(selfUserAdded);
    };
};

module.exports = new newUser();
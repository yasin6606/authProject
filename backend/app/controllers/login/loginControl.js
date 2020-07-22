const controller = require('./../controller');
const UserSchema = require('./../../model/models/Users');
const UserRoleSchema = require('./../../model/models/User-Role');
const RoleAccessRolesSchema = require('./../../model/models/Role-Access-Roles');
const SystemOptionsSchema = require('../../model/models/Access-Levels');
const SelfRegLoginSchema = require('./../../model/SelfRegModel');
const SubOptSchema = require('./../../model/models/Sub-Options');
const bcrypt = require('bcryptjs');

const loginController = class loginControlClass extends controller {

    // login check-in
    login = async (req, res, next) => {

        try {
            // check user email & password
            const loginCheck = await UserSchema.findOne({email: req.body.email});

            // compare hashed password
            const passwordCheck = await bcrypt.compare(req.body.password, loginCheck.password);

            if (!loginCheck || !passwordCheck) return res.sendStatus(401);


            // if username & password were correct, get user's roleId
            const getRoleId = await UserRoleSchema.findOne({userId: loginCheck._id});

            // get user access level by user's roleId at Role-AccessRoles model
            const roleAcc = await RoleAccessRolesSchema.findOne({roleId: getRoleId.roleId}).populate([{path: 'roleId'}, {
                path: 'accSubOptId',
                populate: [{path: 'accessLevelsId'}, {path: 'subOptId'}]
            }]).exec();

            !roleAcc ? res.json().status(500) : res.json({roleAccess: roleAcc, userId: loginCheck._id});
        } catch (err) {
            // send error for not matching username or password
            return res.sendStatus(500);
        }

    };
};

module.exports = new loginController();
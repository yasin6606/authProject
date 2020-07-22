const controller = require('../../controller');
const UserSchema = require('../../../model/models/Users');
const UserRoleSchema = require('../../../model/models/User-Role');
const bcrypt = require('bcryptjs');

const updateUser = class updateUserController extends controller {

    // update user normal information
    updateUserInfo = async (req, res, next) => {

        // first update user information in User model
        const updated = await UserSchema.findByIdAndUpdate(req.params.id, {...req.body});

        if (!updated) return res.sendStatus(500);

        // second update user activity User-Role model (! this condition is very important)
        if (req.body.activity === false || req.body.activity === true) {
            var userRoleUpdated = await UserRoleSchema.findOne({userId: req.params.id}).updateOne({activity: req.body.activity});
            if (!userRoleUpdated) return res.sendStatus(500);
        }

        // second update user role in User-Role model (! this condition is very important)
        if (req.body.roleId) {
            var userRoleUpdated = await UserRoleSchema.findOne({userId: req.params.id}).updateOne({roleId: req.body.roleId});
            if (!userRoleUpdated) return res.sendStatus(500);
        }

        !updated ? res.sendStatus(500) : res.json(updated);
    };

    // change user password
    updatePassword = async (req, res, next) => {

        try {

            // first hash new password
            const hashNewPassword = await bcrypt.hash(req.body.newPassword, 12);

            // update user password in User model
            const password = await UserSchema.findByIdAndUpdate(req.params.id, {password: hashNewPassword});

            if (!password) return res.sendStatus(401);

            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(500);
        }
    };
};

module.exports = new updateUser();
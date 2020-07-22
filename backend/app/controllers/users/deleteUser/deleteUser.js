const controller = require('../../controller');
const UserRoleSchema = require('../../../model/models/User-Role');
const UserSchema = require('../../../model/models/Users');
const RoleSchema = require('../../../model/models/Role');
const RoleAccessRolesSchema = require('../../../model/models/Role-Access-Roles');

const deleteUser = class deleteUserController extends controller {

    // !!! full deleting
    deleteUser = async (req, res, next) => {

        // first delete user data in User-Role model
        const userRoleDel = await UserRoleSchema.findOneAndDelete({ userId: req.params.id });

        if (!userRoleDel) return res.sendStatus(500);

        // second delete user data in User model
        const userDel = await UserSchema.findByIdAndDelete(req.params.id);

        !userDel ? res.sendStatus(500) : res.status(202).json("user is successfully deleted");
    };

    // !! logical deleting
    logicalDeleteUser = async (req, res, next) => {
        const logicalDeleting = await (await UserRoleSchema.findOne({ userId: req.params.id })).updateOne({ logicalDeleting: true });

        !logicalDeleting ? res.status(500).json("server has error") : res.status(202).json("successfully logical deleted");
    };

    // restore user if he/she was logically deleting
    restore = async (req, res, next) => {
        const restore = await (await UserRoleSchema.findOne({ userId: req.params.id })).updateOne({ logicalDeleting: false });

        !restore ? res.status(500).json("server has error") : res.status(202).json("user is successfully restore");
    };
};

module.exports = new deleteUser();
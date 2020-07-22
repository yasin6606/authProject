const controller = require('../../controller');
const UserSchema = require('../../../model/models/Users');
const UserRoleSchema = require('../../../model/models/User-Role');

const userInfo = class userInfoController extends controller {

    // return all user's infos
    showUsersInfo = async (req, res, next) => {
        const info = await UserRoleSchema.find({ logicalDeleting: false }).populate(['userId', 'roleId']).exec();

        !info ? res.sendStatus(500) : res.json(info);
    };

    // single user info
    showSingleUserInfo = async (req, res, next) => {
        const info = await UserRoleSchema.findOne({ userId: req.params.id }).populate(['userId', 'roleId']).exec();

        !info ? res.sendStatus(404) : res.json(info);
    };

    // show users that their waiting for deleting or restoring
    usersDelWaitingInfo = async (req, res, next) => {
        const info = await UserRoleSchema.find({ logicalDeleting: true }).populate(['userId', 'roleId']).exec();

        !info ? res.sendStatus(500) : res.json(info);
    };
};

module.exports = new userInfo();
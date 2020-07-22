const controllers = require('./../controller');
const RoleSchema = require('./../../model/models/Role');
const RoleAccRoleSchema = require('./../../model/models/Role-Access-Roles');
const AccLevSchema = require('./../../model/models/Access-Levels');
const AccSubOptSchema = require('./../../model/models/Acc-SubOpt');
const SubOptSchema = require('./../../model/models/Sub-Options');
const { populate } = require('./../../model/models/Role');

class roles extends controllers {

    // define new roles
    defineRole = async (req, res, next) => {
        // save new role
        const newRole = new RoleSchema({
            roleName: req.body.role,
        });

        const roleCreated = await newRole.save();

        if (!roleCreated) return res.status(500).json({ msg: "error while create role" });


        var ids = new Array(); // an empty array for AccSubOptId of each option

        if (req.body.options.val1) {
            req.body.options.val1.map(async eachOptLevOne => {
                ids.push(eachOptLevOne.id)
            });
        };

        if (req.body.options.val2) {
            req.body.options.val2.map(async eachOptLevTwo => {
                ids.push(eachOptLevTwo.id)
            });
        };

        if (req.body.options.val3) {
            req.body.options.val3.map(async eachOptLevThree => {
                ids.push(eachOptLevThree.id)
            });
        };

        const roleAccRole = new RoleAccRoleSchema({
            roleId: roleCreated._id,
            accSubOptId: ids,
        });

        const newRoleSaved = await roleAccRole.save();

        !newRoleSaved ? res.sendStatus(500) : res.json(newRoleSaved);
    };


    // show roles
    showGroupRoles = async (req, res, next) => {
        const populateOpts = [{ path: 'roleId' }, [{ path: 'accSubOptId', populate: [{ path: 'accessLevelsId' }, { path: 'subOptId' }] }]]

        const rolesOpt = await RoleAccRoleSchema.find({}).populate(populateOpts).exec();

        !rolesOpt ? res.json().status(500) : res.json(rolesOpt);
    };

    // delete role
    deleteRole = async (req, res, next) => {
        // first delete Role-Access-Roles
        const roleAcc = await RoleAccRoleSchema.findByIdAndDelete(req.params.roleAccRolesId);

        if (!roleAcc) return res.sendStatus(500);

        // second delete role in Role model
        const roleDel = await RoleSchema.findByIdAndDelete(req.params.roleId);

        !roleDel ? res.status(500).json("server has error") : res.status(202).json("role is successfully deleted");
    };
};

module.exports = new roles();
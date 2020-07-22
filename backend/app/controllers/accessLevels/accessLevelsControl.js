const controller = require('./../controller');
const AccLevSchema = require('./../../model/models/Access-Levels');
const AccSubOptSchema = require('./../../model/models/Acc-SubOpt');

class accessLevelController extends controller {

    // define new access level
    defineNewAccLev = async (req, res, next) => {
        const accLev = new AccLevSchema({
            title: req.body.accessLevel,
        });

        const accLevelSaved = await accLev.save();

        !accLevelSaved ? res.sendStatus(403) : res.json(accLevelSaved);
    };

    // show access levels
    showAccLev = async (req, res, next) => {
        const accLev = await AccLevSchema.find();

        !accLev ? res.sendStatus(500) : res.json(accLev);
    };

    // delete access levels
    deleteAccLev = async (req, res, next) => {

        // first find and delete documents in Acc-SubOpt that related to this access level
        // const accSubOptDel = await AccSubOptSchema.find({ accessLevelsId: req.params.accLevId }).deleteMany();
    };
};

module.exports = new accessLevelController();
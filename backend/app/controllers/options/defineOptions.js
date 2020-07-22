const controller = require('./../controller');
const AccLevSchema = require('./../../model/models/Access-Levels');
const SubOptSchema = require('./../../model/models/Sub-Options');
const AccSubOptSchema = require('./../../model/models/Acc-SubOpt');

class defineOptions extends controller {

    // define new option
    newOption = async (req, res, next) => {

        // options with level one
        if (req.body.options.opt1) {
            const levOneId = await AccLevSchema.findOne({ title: "levelOne" });

            // save option name and get option _id
            const subOptOne = new SubOptSchema({
                optionName: req.body.options.opt1,
            });

            var optLevOneCreated = await subOptOne.save();

            // ERROR access level one
            if (!optLevOneCreated) return res.sendStatus(500);

            //second create Acc-SubOpt model
            const accSubOptOne = new AccSubOptSchema({
                accessLevelsId: levOneId._id,
                subOptId: optLevOneCreated._id,
            });

            const accSubOptLevOne = await accSubOptOne.save();

            // ERROR access level one
            if (!accSubOptLevOne) return res.sendStatus(500);
        };

        // options with level two
        if (req.body.options.opt2) {
            const levTwoId = await AccLevSchema.findOne({ title: "levelTwo" });

            // save option name and get option _id
            const subOptTwo = new SubOptSchema({
                optionName: req.body.options.opt2,
            });

            var optLevTwoCreated = await subOptTwo.save();

            // ERROR access level one
            if (!optLevTwoCreated) return res.sendStatus(500);

            //second create Acc-SubOpt model
            const accSubOptTwo = new AccSubOptSchema({
                accessLevelsId: levTwoId._id,
                subOptId: optLevTwoCreated._id,
            });

            const accSubOptLevTwo = await accSubOptTwo.save();

            // ERROR access level two
            if (!accSubOptLevTwo) return res.sendStatus(500);
        };

        // options with level three
        if (req.body.options.opt3) {
            const levThreeId = await AccLevSchema.findOne({ title: "levelThree" });

            // save option name and get option _id
            const subOptThree = new SubOptSchema({
                optionName: req.body.options.opt3,
            });

            var optLevThreeCreated = await subOptThree.save();

            // ERROR access level one
            if (!optLevThreeCreated) return res.sendStatus(500);

            //second create Acc-SubOpt model
            const accSubOptThree = new AccSubOptSchema({
                accessLevelsId: levThreeId._id,
                subOptId: optLevThreeCreated._id,
            });

            const accSubOptLevThree = await accSubOptThree.save();

            // ERROR access level three
            if (!accSubOptLevThree) return res.sendStatus(500);
        };

        // finally
        res.sendStatus(200);
    };

    // show options
    showOptions = async (req, res, next) => {
        const opts = await AccSubOptSchema.find().populate(['accessLevelsId', 'subOptId']).exec();

        !opts ? res.sendStatus(500) : res.json(opts);
    };

    // delete option
    deleteOption = async (req, res, next) => {
        // first delete from Acc-SubOpt model
        const delAccOpt = await AccSubOptSchema.findByIdAndDelete(req.params.accOptModelId);

        if (!delAccOpt) return res.sendStatus(500);

        // second delete from Sub-Options model
        const delOpt = await SubOptSchema.findByIdAndDelete(req.params.optionId);

        !delOpt ? res.sendStatus(500) : res.sendStatus(200);
    };
};

module.exports = new defineOptions();
const controller = require('./../controller');
const SelfRegModel = require('./../../model/SelfRegModel');

class selfRegController extends controller {

    // self register in login page
    selfReg = async (req, res, next) => {
        const selfReg = new SelfRegModel({ ...req.body });

        const reg = await selfReg.save();
        reg ? res.status(201).json(reg) : res.status(500).json({ msg: "cannot register" });
    };
};

module.exports = new selfRegController();
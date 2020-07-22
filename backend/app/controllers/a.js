const controllers = require('./controller');
const b = require('./../model/models/Access-Levels')

class aa extends controllers {

    // define roles
    a = async (req, res, next) => {
        await new b({
            title : 'levelThree'
        }).save();

        console.log('done')
    }
};

module.exports = new aa();
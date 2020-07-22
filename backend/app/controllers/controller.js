const autoBind = require('auto-bind');

class autoBindClass {
    constructor() {
        autoBind(this);
    };
};

module.exports = autoBindClass;
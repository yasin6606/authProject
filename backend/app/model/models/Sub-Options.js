const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subOptions = Schema({
    optionName: { type: String, },
}, { timestamps: true });

module.exports = mongoose.model('SubOptions', subOptions);
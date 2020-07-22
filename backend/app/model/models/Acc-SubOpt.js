const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accSubOpt = Schema({
    accessLevelsId: { type: Schema.Types.ObjectId, ref: 'AccessLevels', required: true }, // about access levels
    subOptId: { type: Schema.Types.ObjectId, ref: 'SubOptions', required: true }, // about sub options
}, { timestamps: true });

module.exports = mongoose.model('AccessLevelSubOptions', accSubOpt);
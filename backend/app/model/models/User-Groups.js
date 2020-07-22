const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroups = Schema({
    name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('UserGroups', userGroups);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = Schema({
    roleName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Role', role);
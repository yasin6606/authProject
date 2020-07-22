const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalID: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: Boolean, default: false, required: true }, // false = male & true : female
}, { timestamps: true });

module.exports = mongoose.model('Users', users);
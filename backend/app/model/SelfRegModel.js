const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selfRegSchema = Schema({
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'newUserSchema' }
}, { timestamps: true });

module.exports = mongoose.model('selfRegModel', selfRegSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDeleting = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    logicalDeleting: { type: Boolean, default: false },
    fullDeleting: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserDeleting', userDeleting);
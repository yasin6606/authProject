const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRole = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    logicalDeleting: { type: Boolean, default: false },
    activity: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('UserRole', userRole);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleAccessRoles = Schema({
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    accSubOptId: [{ type: Schema.Types.ObjectId, ref: 'AccessLevelSubOptions', required: true }],
}, { timestamps: true });

module.exports = mongoose.model('RoleAccessRoles', roleAccessRoles);
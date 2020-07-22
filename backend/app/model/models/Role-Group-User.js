const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleGroupUser = Schema({
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    roleGroupId: { type: Schema.Types.ObjectId, ref: 'RoleGroups', required: true },
}, { timestamps: true });

module.exports = mongoose.model('RoleGroupUser', roleGroupUser);
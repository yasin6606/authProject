const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleGroups = Schema({
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('RoleGroups', roleGroups);
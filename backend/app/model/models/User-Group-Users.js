const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupUsers = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    userGroupId: { type: Schema.Types.ObjectId, ref: 'UserGroups', required: true },
}, { timestamps: true });

module.exports = mongoose.model('UserGroupUsers', userGroupUsers);
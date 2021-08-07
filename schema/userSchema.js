const _ = require('lodash');
const mongoose = require('mongoose');
const modelName = 'users';

const UserSchema = new mongoose.Schema({
    userIdentifier: {
        type : String,
        trim: true,
        required: true,
        unique: true
    },
    terraWalletAdd: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model(modelName, UserSchema);
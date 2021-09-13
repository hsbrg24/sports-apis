const _ = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const modelName = 'pools';

// Create Schema objects and set validations
const poolSchema = new mongoose.Schema({
    key: { type: String, trim: true, required: true, unique: true },
    members: { type: Array, trim: true },
    payouts: { type: Array, trim: true },
    membersRequired: { type: Number, trim: true },
    price: { type: Number, trim: true }
});

poolSchema.plugin(uniqueValidator);
module.exports = mongoose.model(modelName, poolSchema);
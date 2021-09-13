const _ = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const modelName = 'fantacy';

// Create Schema objects and set validations
const matchSchema = new mongoose.Schema({
    key: { type: String, trim: true, required: true, unique: true },
    fantacy: {
        metrics: { type: Array, trim: true },
        points: { type: Array, trim: true },
        updated: { type: String, trim: true }
    },
    match: {
        data_review_checkpoint: { type: String, trim: true },
        status: { type: String, trim: true },
        status_overview:{ type: String, trim: true }
    },
    players: { type: Object, trim: true },
    team: { type: Object, trim: true }
});

matchSchema.plugin(uniqueValidator);
module.exports = mongoose.model(modelName, matchSchema); 
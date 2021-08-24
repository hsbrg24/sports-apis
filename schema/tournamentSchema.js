const _ = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const modelName = 'tournaments';

// Create Schema objects and set validations
const tournament = new mongoose.Schema({
    t_key: { type: String, trim: true, required: true, unique: true },
    short_name: { type: String, trim: true, required: true },
    legal_name: { type: String, trim: true, required: true },
    pointing_system: { type: String, trim: true, required: true },
    end_date: {
        timestamp: { type: String, trim: true, required: true },
        gmt: { type: Date, trim: true, required: true },
    },
    start_date: {
        timestamp: { type: String, trim: true, required: true },
        gmt: { type: Date, trim: true, required: true },
    },
    competition: {
        key: { type: String, trim: true },
        name: { type: String, trim: true },
        short_name: { type: String, trim: true }
    },
    rounds: [{
        groups: [{
            key: { type: String, trim: true },
            name: { type: String, trim: true },
            teams: [{ type: String, trim: true }]
        }],
        order_index: { type: Number, trim: true },
        points_enabled: { type: Boolean, trim: true },
        teams: [{ type: String, trim: true }],
        key: { type: String, trim: true },
        name: { type: String, trim: true },
    }],
    teams: { type: Object, trim: true },
});

tournament.plugin(uniqueValidator);
module.exports = mongoose.model(modelName, tournament); //Compiling schema to model
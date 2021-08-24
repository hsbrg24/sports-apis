const _ = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const modelName = 'matches';

// Create Schema objects and set validations
const matchSchema = new mongoose.Schema({
    key: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true },
    away: { type: String, trim: true },
    home: { type: String, trim: true },
    round: {
        key: { type: String, trim: true },
        name: { type: String, trim: true }
    },
    short_name: { type: String, trim: true },
    stadium: {
        key: { type: String, trim: true },
        name: { type: String, trim: true },
        city: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    start_date: {
        timestamp: { type: String, trim: true, required: true },
        gmt: { type: Date, trim: true, required: true },
    },
    tournament: {
        short_name: { type: String, trim: true, required: true },
        legal_name: { type: String, trim: true, required: true },    
        key: { type: String, trim: true },
        name: { type: String, trim: true },
    },
    status: { type: String, trim: true },
    result: {
        title:{ type: String, trim: true }
    }
});

matchSchema.plugin(uniqueValidator);
module.exports = mongoose.model(modelName, matchSchema); 
const _ = require('lodash');
const mongoose = require('mongoose');
const modelName = 'match_schema';

// Create Schema objects and set validations
const matchSchema = new mongoose.Schema({
    team1: {
        type: String,
        trim: true,
        required: true,
    },
    team2: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
    group: {
        type: Number,
        trim: true,
        required: true,
    }
});


module.exports = mongoose.model(modelName, matchSchema); //Compiling schema to model
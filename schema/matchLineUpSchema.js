const _ = require('lodash');
const mongoose = require('mongoose');
const modelName = 'line_up';

// Create Schema objects and set validations
const lineUpSchema = new mongoose.Schema({
    matchId: { type: String, trim: true, required: true },
    scheduled: { type: Date, trim: true, required: true },
    status: { type: String, trim: true, required: true },
    season: {
        seasonId: { type: String, trim: true, required: true },
        seasonName: { type: String, trim: true, required: true },
        start_date: { type: Date, trim: true, required: true },
        end_date: { type: Date, trim: true, required: true },
        year: { type: Date, trim: true },
        tournamentId: { type: String, trim: true, required: true }
    },
    tournament: {
        id: { type: String, trim: true },
        name: { type: String, trim: true },
        sport: {
            id: { type: String, trim: true },
            name: { type: String, trim: true }
        },
        category: {
            id: { type: String, trim: true },
            name: { type: String, trim: true },
            country_code: { type: String, trim: true }
        },
        type: { type: String, trim: true },
        gender: { type: String, trim: true }
    },
    venueId: { type: String, trim: true, required: true }
});


module.exports = mongoose.model(modelName, lineUpSchema); //Compiling schema to model
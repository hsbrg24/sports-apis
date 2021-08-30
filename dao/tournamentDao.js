const recentTournamentSchema = require('../schema/recentTournamentSchema');
const tournamentSchema = require('../schema/tournamentSchema');
const mongoose = require('mongoose');

exports.createRecentTour = async (tournament) => {
    try {
        const userJSON = {
            t_key: tournament.key,
            name: tournament.name,
            short_name: tournament.short_name,
            end_date: {
                timestamp: tournament.end_date.timestamp,
                gmt: tournament.end_date.gmt
            },
            start_date: {
                timestamp: tournament.start_date.timestamp,
                gmt: tournament.start_date.gmt
            },
            competition: {
                key: tournament.competition.key,
                name: tournament.competition.name,
                short_name: tournament.competition.short_name
            }
        }
        return await recentTournamentSchema.create(userJSON)
    } catch (e) {
        if (e instanceof mongoose.Error) {
            throw new Error(e, e._message)
        }
        throw new Error('Something went wrong!')
    }
};

exports.createTournament = async (tournament) => {
    try {
        const userJSON = {
            t_key: tournament.key,
            name: tournament.name,
            short_name: tournament.short_name,
            legal_name: tournament.legal_name,
            pointing_system: tournament.pointing_system,
            end_date: {
                timestamp: tournament.end_date.timestamp,
                gmt: tournament.end_date.gmt
            },
            start_date: {
                timestamp: tournament.start_date.timestamp,
                gmt: tournament.start_date.gmt
            },
            competition: {
                key: tournament.competition.key,
                name: tournament.competition.name,
                short_name: tournament.competition.short_name
            },
            rounds: tournament.rounds,
            teams: tournament.teams,
        }
        return await tournamentSchema.create(userJSON)
    } catch (e) {
        if (e instanceof mongoose.Error) {
            throw new Error(e, e._message)
        }
        throw new Error('Something went wrong!')
    }
};



exports.getAlltournaments = () => {
    return tournamentSchema.find().select({ t_key: 1, name: 1, _id: 0 });
};

exports.getAllToru = () => {
    return tournamentSchema.find().select({
        _id: 0,
        t_key: 1,
        name: 1,
        short_name: 1,
        legal_name:1,
        start_date: 1,
        end_date: 1,
        competition: 1
    })
}

exports.getAllToruRounds = (t_key) => {
    return tournamentSchema.findOne({t_key}).select({
        _id: 0,
        t_key: 1,
        name: 1,
        short_name: 1,
        legal_name:1,
        start_date: 1,
        end_date: 1,
        rounds: 1,
    })
}

/**

 */
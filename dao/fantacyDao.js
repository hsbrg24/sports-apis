const mongoose = require('mongoose');
const fantacySchema = require('../schema/fantacySchema');

exports.createMatchFantacyData = async (fMatch) => {
    try {
        const userJSON = {
            key: fMatch.data.key,
            fantacy: {
                metrics: fMatch.data.fantasy.metrics,
                points: fMatch.data.fantasy.points,
                updated: fMatch.data.fantasy.updated,
            },
            match: {
                data_review_checkpoint: fMatch.data.match.data_review_checkpoint,
                status: fMatch.data.match.status,
                status_overview: fMatch.data.match.status_overview
            },
            players: fMatch.data.players,
            team: fMatch.data.team,
        }
        return await fantacySchema.create(userJSON)
    } catch (e) {
        if (e instanceof mongoose.Error) {
            throw new Error(e, e._message)
        }
        throw new Error('Something went wrong!')
    }
};

exports.getallFantacyMatchData = async () => {
    return await fantacySchema.find();
}

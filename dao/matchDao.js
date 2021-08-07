const matchSchema = require('../schema/matchSchema');

exports.create = (matchDetail) => {
    return new matchSchema({
        team1: matchDetail.team1,
        team2: matchDetail.team2,
        location: matchDetail.location,
        group: matchDetail.group,
    }).save();
};

exports.getAllMatches = () => {
    return matchSchema.find();
}
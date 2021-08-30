const matchSchema = require('../schema/matchSchema');

exports.create = (matchDetail) => {
    return new matchSchema({
        key: matchDetail.match.key,
        name: matchDetail.match.name,
        away: matchDetail.match.away,
        home: matchDetail.match.home,
        round: {
            key: matchDetail.match.round.key,
            name: matchDetail.match.round.name
        },
        short_name: matchDetail.match.short_name,
        status: matchDetail.match.status,
        start_date: {
            timestamp: matchDetail.match.start_date.timestamp,
            gmt: matchDetail.match.start_date.gmt
        },
        stadium: {
            key: matchDetail.match.stadium.key,
            name: matchDetail.match.stadium.name,
            city: matchDetail.match.stadium.city,
            country: matchDetail.match.stadium.country

        },
        tournament: {
            key: matchDetail.match.tournament.key,
            name: matchDetail.match.tournament.name,
            short_name: matchDetail.match.tournament.short_name,
            legal_name: matchDetail.match.tournament.legal_name
        },
        result: {
            title: matchDetail.result.title
        }

    }).save();
};

exports.getAllMatches = (condition) => {
    return matchSchema.find(condition);
}

exports.getMatchesByDate = (date) => {
    console.log("utc String", new Date(date).toUTCString());
    if (date)
        return matchSchema.find({ "start_date.gmt": { $gte: new Date(date).toUTCString() } })
    else
        return matchSchema.find({ "start_date.gmt": { $gte: new Date() } })
}
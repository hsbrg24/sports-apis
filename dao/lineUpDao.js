const matchLineUpSchema = require('../schema/matchLineUpSchema');

exports.create = (lineupDetail) => {
    return new matchLineUpSchema({

        matchId: lineupDetail.id,
        scheduled: lineupDetail.scheduled,
        status: lineupDetail.status,
        season: {
            seasonId: lineupDetail.season.id,
            seasonName: lineupDetail.season.name,
            start_date: lineupDetail.season.start_date,
            end_date: lineupDetail.season.end_date,
            year: lineupDetail.season.year,
            tournamentId: lineupDetail.season.tournament_id
        },
        tournament: {
            id: lineupDetail.tournament.id,
            name: lineupDetail.tournament.name,
            sport: {
                id: lineupDetail.tournament.sport.id,
                name: lineupDetail.tournament.sport.name
            },
            category: {
                id: lineupDetail.tournament.category.id,
                name: lineupDetail.tournament.category.name,
                country_code: lineupDetail.tournament.category.country_code
            },
            type: lineupDetail.tournament.type,
            gender: lineupDetail.tournament.gender
        },
        venueId: lineupDetail.venue.id
    }).save();
};

exports.getAllMatchIds = () => {
    return matchLineUpSchema.find().select({ 'matchId': 1, _id: 0 });
}

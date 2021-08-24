const _ = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const modelName = 'tournamentSchema';

// Create Schema objects and set validations
const tournament = new mongoose.Schema({
    teams: { type: Object, trim: true },
    order_index: { type: Number, trim: true },
    points_enabled: { type: Boolean, trim: true },
    matches: [{
        
        teams: [{ type: String, trim: true }],
        
        key: { type: String, trim: true },
        name: { type: String, trim: true },
        away: { type: String, trim: true },
        home: { type: String, trim: true },

        round: {
            key: { type: String, trim: true },
            name: { type: String, trim: true }
        },

        short_name: { type: String, trim: true },


    }],
    teams: { type: Object, trim: true },
});

/*
round: {
      groups: null,
      key: '1334097560897458177',
      matches: [Array],
      name: 'Group Phase',
      order_index: 0,
      points_enabled: false,
      teams: [Object]
    }

{
                            "match": {
                                "away": "1334099014592892929",
                                "home": "1129630983964987393",
                                "key": "1334100834660782081",
                                "name": "Qatar vs Bangladesh",
                                "round": {
                                    "key": "1334097560897458177",
                                    "name": "Second Round"
                                },
                                "short_name": "QTR vs BAN",
                                "stadium": {
                                    "city": "Doha",
                                    "country": "Qatar",
                                    "key": "1129629997980585985",
                                    "name": "Khalifa International Stadium"
                                },
                                "start_date": {
                                    "gmt": "2020-12-04T16:00:00",
                                    "timestamp": 1607097600
                                },
                                "status": "completed",
                                "tournament": {
                                    "key": "1334092021987676161",
                                    "legal_name": "FIFA World Cup Qualifiers - Asia 2020",
                                    "name": "FIFA World Cup Qualifiers - Asia",
                                    "short_name": "FIFAWCQA"
                                }
                            },
                            "result": {
                                "title": "5 : 0"
                            }
                        }

*/


tournament.plugin(uniqueValidator);
module.exports = mongoose.model(modelName, tournament); //Compiling schema to model
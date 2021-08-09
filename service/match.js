const request = require('request');
const constant = require('./../utils/constant');
const res = require('../utils/custom-error-response');
const lineUpDAO = require('../dao/lineUpDao');


const promiseRequest = function (methodName, url, json) {
    const options = {
        method: methodName,
        headers: {
            "content-type": "application/json",
        },
        url: url,
        json: json,
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            return resolve(body);
        });
    });
};


const Match = {

    async getMatchData() {
        try {
            const data = await matchDAO.getAllMatches();
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async creatMatchData(data) {
        try {
            const created = await matchDAO.create(data);
            return Promise.resolve(created);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getMatchLineUp() {
        try {

            const url = constant.BASE_URL + `/cricket-t2/en/schedules/2019-03-01/schedule.json?api_key=${constant.API_KEY_CRICKET}`;
            const dataResp = JSON.parse(await promiseRequest('GET', url));

            for (let i = 0; i < dataResp.sport_events.length; i++) {

                console.log("sportEvent:", dataResp.sport_events[i]);
                let created = await lineUpDAO.create(dataResp.sport_events[i]);
                console.log("lopping through:", created);

            }

            return Promise.resolve("created!");
        }
        catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getAllSavedMatches() {
        try {
            const AllIds = await lineUpDAO.getAllMatchIds();
            return Promise.resolve({ "allMatcheIds": AllIds });
        }
        catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }


}

module.exports = Match;


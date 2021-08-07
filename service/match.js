const request = require('request');
const constant = require('./../utils/constant');
const res = require('../utils/custom-error-response');
const matchDAO = require('../dao/matchDao');


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
            const created = await matchDAO.create(data)
            return Promise.resolve(created);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },


}

module.exports = Match;


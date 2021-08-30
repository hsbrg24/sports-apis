const request = require('request');
const constant = require('./../utils/constant');

const { auth } = require('../utils/authUtility');

const res = require('../utils/custom-error-response');

const lineUpDAO = require('../dao/lineUpDao');
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

    async getMatchData(id) {
        try {
            
            const ACCESS_TOKEN = await auth();

            const url = `${constant.footballCred.baseURL}match/${id}/?access_token=${ACCESS_TOKEN}`
            console.log("url:", url);
            
            const resp = JSON.parse(await promiseRequest("GET", url));
            console.log("resp:", resp);
            
            // await tournamentDAO.createTournament(resp.data.tournament);
            
            return Promise.resolve({ "Record Inserted": resp });
        
        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async getPlayerData(tId, pId) {
        try {
            
            const ACCESS_TOKEN = await auth();

            const url = `${constant.footballCred.baseURL}tournament/${tId}/player/${pId}?access_token=${ACCESS_TOKEN}`
            console.log("url:", url);
            
            const resp = JSON.parse(await promiseRequest("GET", url));
            console.log("resp:", resp);
            
            // await tournamentDAO.createTournament(resp.data.tournament);

            return Promise.resolve({ "Record Inserted": resp });
        
        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async getTeamData(tId, teamId) {
        try {
            
            const ACCESS_TOKEN = await auth();

            const url = `${constant.footballCred.baseURL}tournament/${tId}/team/${teamId}?access_token=${ACCESS_TOKEN}`
            console.log("url:", url);

            const resp = JSON.parse(await promiseRequest("GET", url));
            console.log("resp:", resp);

            // await tournamentDAO.createTournament(resp.data.tournament);
            
            return Promise.resolve({ "Resp": resp });

        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async getTodaysMatches(params) {
        try {
            const { date } = params
            const getMatches = await matchDAO.getMatchesByDate(date);
            console.log("getMatch:", getMatches);
            return Promise.resolve([{ total: getMatches.length, allMatches: getMatches }]);
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


const request = require('request');
const constant = require('../utils/constant');
const res = require('../utils/custom-error-response');
const lineUpDAO = require('../dao/lineUpDao');
const tournamentDAO = require('../dao/tournamentDao');
const matchDAO = require('../dao/matchDAO');



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

const auth = async () => {
    if (constant.footballCred.token) {
        console.log("Saved access tokem", constant.footballCred.token)
        return constant.footballCred.token;
    }

    const auth = {
        "access_key": constant.footballCred.accessKey,
        "secret_key": constant.footballCred.secretKey,
        "app_id": constant.footballCred.appId,
        "device_id": constant.footballCred.deviceId
    }
    const url = constant.footballCred.baseURL + 'auth/';
    console.log('TokenUrl:', url, auth);
    const resp = await promiseRequest("POST", url, auth);
    console.log('resp', resp);
    if (resp.status_code === 200) {
        constant.footballCred.token = resp.auth.access_token
        return resp.auth.access_token;
    }
}

const tournament = {

    async getAllsavedTour() {
        try {
            const data = await tournamentDAO.getAllToru();
            return Promise.resolve(data);

        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async gettournamentRounds(id) {
        try {
            const data = await tournamentDAO.getAllToruRounds(id);
            return Promise.resolve(data);

        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async tournament(id) {
        try {
            const ACCESS_TOKEN = await auth();
            const url = `${constant.footballCred.baseURL}tournament/${id}/?access_token=${ACCESS_TOKEN}`
            console.log("url:", url);

            const resp = JSON.parse(await promiseRequest("GET", url));
            console.log("data:", resp);

            await tournamentDAO.createTournament(resp.data.tournament);
            return Promise.resolve({ "Record Inserted": resp });
        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async recentTournament() {
        try {
            const ACCESS_TOKEN = await auth();
            const url = `${constant.footballCred.baseURL}recent_tournaments/?access_token=${ACCESS_TOKEN}`
            const resp = JSON.parse(await promiseRequest("GET", url));
            let i = 0
            for (i; i < resp.data.tournaments.length; i++) {
                await tournamentDAO.createRecentTour(resp.data.tournaments[i]);
            }
            return Promise.resolve(`Inserted ${i} records!`);
        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async getTournamentRound(params) {
        try {
            const ACCESS_TOKEN = await auth();

            //GET Tournament Round
            const url = `${constant.footballCred.baseURL}tournament/${params.tId}/round-detail/${params.rId}?access_token=${ACCESS_TOKEN}`
            console.log("url:", url);

            const resp = JSON.parse(await promiseRequest("GET", url));
            // console.log("data:", resp);
            let i = 0

            //updating matches from Tournament 
            for (i; i < resp.data.round.matches.length; i++) {
                await matchDAO.create(resp.data.round.matches[i]);
            }

            return Promise.resolve(`Inserted total of ${i} matches from round_key ${resp.data.round.key} & round_name ${resp.data.round.name}!`);
        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },


    async getSavedTournaments() {
        try {
            const data = await tournamentDAO.getAlltournaments();
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },


    async getSavedMatchesFromDB(params) {
        try {
            const condition = { "round.key": params.rId, "tournament.key": params.tId }
            let data = {}
            data = await matchDAO.getAllMatches(condition);
            if (data.length === 0) {
                const ACCESS_TOKEN = await auth();

                //GET Tournament Round
                const url = `${constant.footballCred.baseURL}tournament/${params.tId}/round-detail/${params.rId}?access_token=${ACCESS_TOKEN}`
                // console.log("url:", url);

                const resp = JSON.parse(await promiseRequest("GET", url));
                console.log("data:", resp.data.round.matches);
                let i = 0

                //updating matches from Tournament 
                for (i; i < resp.data.round.matches.length; i++) {
                    await matchDAO.create(resp.data.round.matches[i]);
                }
                return Promise.resolve(resp.data.round.matches);

            }
            console.log("data:", data.length);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message, error.stack));
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

module.exports = tournament;


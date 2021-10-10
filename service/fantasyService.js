const axios = require('axios');

const constant = require('./../utils/constant');
const { auth } = require('./../utils/authUtility');
const res = require('../utils/custom-error-response');

const FantacyDao = require('../dao/fantacyDao');


const promiseRequest = async (methodName, url) => {
    switch (methodName) {
        case 'GET':
            return await axios.get(url)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        default:
            console.log("didn't choose any appropriate case!");
            break;
    }
}

const Fantasy = {

    async getFantasyData(id) {
        try {

            const ACCESS_TOKEN = await auth();

            const url = `${constant.footballCred.baseURL}fantasy-match-points/${id}/?access_token=${ACCESS_TOKEN}&model=RZ-C-A100`;

            // const resp = JSON.parse(await promiseRequest("GET", url));

            const resp = await promiseRequest('GET', url);
            console.log("some legit resp:", resp.data.fantasy);

            resp.data.key = id;
            // const data = {
            //     fantasy: resp.data.fantasy,
            //     match: resp.data.match
            // }

            const csn = await FantacyDao.createMatchFantacyData(resp);
            console.log("look csn:", csn);

            return Promise.resolve(resp);

        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async getAllFantacyMatches(){
        try {
            const resp = await FantacyDao.getallFantacyMatchData();

            return Promise.resolve({length: resp.length ,resp});

        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }

    }

}

module.exports = Fantasy;

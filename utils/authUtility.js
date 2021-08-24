const request = require('request');
const constant = require('./../utils/constant');
const res = require('../utils/custom-error-response');
const lineUpDAO = require('../dao/lineUpDao');
const tournamentDAO = require('../dao/tournamentDao');


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

exports.auth = async () => {
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
};
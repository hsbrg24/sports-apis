const request = require('request');
const constant = require('./../utils/constant');

const poolDAO = require('../dao/poolDao');

const res = require('../utils/custom-error-response');
const { random } = require('lodash');


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

const Pool = {

    async getPool(id) {
        try {

            const condition = {};
            const resp = await poolDAO.getPools(condition);
            return Promise.resolve(resp);

        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    },

    async createPool(value) {
        try {

            const data = {
                key: random(9),
                membersRequired: value.membersRequired,
                price: value.price,
                members: [],
                payouts: "fixed_payouts"
            }

            const value = await poolDAO.createPool(data);

            return Promise.resolve({ "Record Inserted": value });

        } catch (error) {
            console.log("look at this:", error);
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));
        }
    }

}

module.exports = Pool;
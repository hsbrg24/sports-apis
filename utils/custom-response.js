const constant = require('../utils/constant');

const customResponse = {
    message: constant.SUCCESS,
    data: {},
    response: function (msg, result) {
        this.message = msg;
        this.data = result || '';
        return this;
    }
}

module.exports = customResponse;
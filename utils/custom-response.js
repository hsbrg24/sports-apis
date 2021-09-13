const constant = require('../utils/constant');

const customResponse = {
    status: constant.HTTP_STATUS_CODE.SUCCESS,
    message: constant.SUCCESS,
    data: {},
    response: function (msg, result) {
        this.message = msg;
        this.data = result ?? null;
        // this.status = this.status
        return this;
    }
}

module.exports = customResponse;
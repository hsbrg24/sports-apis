const userDao = require('../dao/userDao');
const _ = require('lodash');
const constant = require('../utils/constant')
const uuid = require('uuid');

// let fixedEncodeURIComponent = (str) => {
//     return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
//         return '%' + c.charCodeAt(0).toString(16);
//     });
// }

const GenerateUnique = async (Id) => {
    const userId = uuid.v1();
    const arr = userId.split('-');
    const respDB = await userDao.checkUnique(arr[0]);
    if (respDB.length === 0)
        return arr[0];
    else
        GenerateUnique(Id);
}

const UserService = {
    async createUser(walletId) {
        try {
            const userId = await GenerateUnique(walletId);
            const dataSet = {
                userId,
                terraWalletAdd: walletId
            }
            const data = await userDao.create(dataSet);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getAllUsers(){
        try {
            const data = await userDao.getAllUsers();
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }

}


module.exports = UserService;

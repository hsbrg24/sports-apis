const mongoose = require('mongoose');
const poolSchema = require('../schema/poolSchema');

exports.createPool = async (pool) => {
    try {
        const poolJSON = {
            key: pool.key,
            price: pool.price,
            payouts: pool.payouts,
            members: pool.members,
            membersRequired: pool.membersRequired,
        }
        return await poolSchema.create(poolJSON)
    } catch (e) {
        if (e instanceof mongoose.Error) {
            throw new Error(e, e._message)
        }
        throw new Error('Something went wrong!')
    }
};

exports.getPools = async (condition) => {
    return await poolSchema.find(condition);
}
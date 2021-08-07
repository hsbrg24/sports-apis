const userSchema = require('../schema/userSchema');

exports.create = (userDetails) => {
    return new userSchema({
        userIdentifier: userDetails.userId,
        terraWalletAdd: userDetails.terraWalletAdd,
    }).save();
};

exports.getAllUsers = () => {
    return userSchema.find().select({ "userIdentifier": 1, "terraWalletAdd": 1, _id: 0 });
};

exports.checkUnique = (value) => {
    return userSchema.find({ userIdentifier: value });
}
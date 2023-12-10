const User = require("../models/user.model");

const getUserById = (id) => {
    return User.findOne({ _id: id });
}

const getUserByEmail = (email) => {
    return User.findOne({ email });
}

const getNewUser = (user) => {
    return new User(user);
}

module.exports = {
    getUserById,
    getUserByEmail,
    getNewUser
}
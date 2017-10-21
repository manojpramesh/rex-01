const mongoHelper = require('../helpers/mongo.helper');
const mongoConfig = require('../config/mongo');

module.exports = {

    addUser: (user, cb) => {
        mongoHelper.insertDocument(user, mongoConfig.userCollection, cb);
    },

    editUser: () => {

    },

    searchUser: (user, cb) => {
        mongoHelper.searchDocument(user, mongoConfig.userCollection, cb)
    },

    deleteUser: () => {

    }
}
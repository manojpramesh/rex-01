const mongoHelper = require('../helpers/mongo.helper');
const mongoConfig = require('../config/mongo');

module.exports = {

    addProperty: (data, cb) => {
        mongoHelper.insertDocument(data, mongoConfig.propertyCollection, cb);
    },

    editProperty: (condition, data, cb) => {
        mongoHelper.updateDocument(condition, data, mongoConfig.propertyCollection, cb);
    },

    searchProperty: (field, cb) => {
        mongoHelper.searchDocument(field, mongoConfig.propertyCollection, cb)
    },

    deleteProperty: (field, cb) => {
        mongoHelper.deleteDocument(field, mongoConfig.propertyCollection, cb);
    },

    getNextId: (cb) => {
        mongoHelper.getDocumentCount(mongoConfig.propertyCollection, cb);
    }
}
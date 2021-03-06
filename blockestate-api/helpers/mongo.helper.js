const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = require('../config/mongo').url;

module.exports = {

    insertDocument: (data, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).insertOne(data, function(err, result) {
                assert.equal(err, null);
                db.close();
                callback(null, result);
            });
        });
    },

    updateDocument: (condition, data, collection, callback) => {
        if (data.lastModified != undefined) delete data.lastModified;
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).updateOne(condition, {
                $set: data,
                $currentDate: { "lastModified": true }
            }, function(err, result) {
                assert.equal(err, null);
                db.close();
                callback(null, result);
            });
        });
    },

    searchDocument: (field, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection(collection).find(field);
            var result = [];
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    result.push(doc);
                } else {
                    db.close();
                    callback(null, result);
                }
            });
        });
    },

    deleteDocument: (field, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).remove(field);
            assert.equal(err, null);
            db.close();
            callback(true);
        });
    },

    getDocumentCount: (collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).count({}, function(error, numOfDocs) {
                assert.equal(err, null);
                db.close();
                callback(null, numOfDocs);
            });
        });
    },

    getRecentlyAdded: (count, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection(collection).find({}).sort({ $natural: 1 }).limit(count);
            var result = [];
            cursor.each(function(err, doc) {
                if (doc != null) {
                    result.push(doc);
                } else {
                    db.close();
                    callback(err, result);
                }
            });
        });
    },

    getRandomDocuments(count, collection, callback) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection(collection).aggregate(
                [{ $sample: { size: count } }]
            );
            var result = [];
            cursor.each(function(err, doc) {
                if (doc != null) {
                    result.push(doc);
                } else {
                    db.close();
                    callback(err, result);
                }
            });
        });
    }

};
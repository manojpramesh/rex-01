const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = require('../config/mongo.config').url;

var mongoUtil = {

    insertDocument: (data, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).insertOne(data, function(err, result) {
                assert.equal(err, null);
                console.log("document inserted at " + collection + "collection");
                console.log(data);
                db.close();
                callback(result);
            });
        });
    },

    updateDocument: (condition, data, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).updateOne(condition, {
                $set: data,
                $currentDate: { "lastModified": true }
            }, function(err, results) {
                console.log(results);
                callback();
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
                    console.dir(doc);
                    result.push(doc);
                } else {
                    db.close();
                    callback(result);
                }
            });
        });
    },

    deleteDocument: (field, collection, callback) => {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(collection).remove(field);
            var result = "";
            assert.equal(err, null);
            db.close();
            callback(result);
        });
    }

};

module.exports = mongoUtil;
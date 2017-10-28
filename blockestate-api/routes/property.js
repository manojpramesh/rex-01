var express = require('express');
var router = express.Router();
var propertyModel = require('../models/property.model');
var propertyContract = require('../ethereum/property.contract');

// Get properties
router.get('/getProperties', function(req, res, next) {
    if (req.query.id != undefined) req.query.id = parseInt(req.query.id);
    propertyModel.searchProperty(req.query, (err, result) => {
        res.json(result);
    });
});

// Get details about a property
router.get('/getProperty', function(req, res, next) {
    var result = propertyContract.getProperty([req.query.id]);
    res.json(JSON.parse(result));
});

// Add a new property
router.post('/addProperty', function(req, res, next) {
    propertyModel.getNextId((err, id) => {
        let data = req.body;
        data.id = id + 1000;
        data.status = 'forsale';
        data.txHash = propertyContract.addProperty([id, JSON.stringify(data)]);
        propertyModel.addProperty(data, (err, result) => {
            res.json(result);
        });
    });
});

// Change status of a property to sold
router.get('/sellProperty', function(req, res, next) {
    let id = parseInt(req.query.id);
    propertyModel.searchProperty({ id: id }, (err, result) => {
        let data = result[0];
        if (data.lastModified != undefined) delete data.lastModified;
        data._id = data.txHash = undefined;
        data.status = 'sold';
        data.txHash = propertyContract.addProperty([data.id, JSON.stringify(data)]);
        propertyModel.editProperty({ id: id }, data, (err, result) => {
            res.json(result);
        });
    });
});

// Edit details about a property
router.post('/editProperty', function(req, res, next) {
    let data = req.body;
    if (data.id == undefined) res.status(400).send('Id field is not valid.')
    data.txHash = propertyContract.editProperty([data.id, JSON.stringify(data)]);
    propertyModel.editProperty({ id: data.id }, data, (err, result) => {
        res.json(result);
    });
});

// Delete a property from list
router.post('/deleteProperty', function(req, res, next) {
    var result = propertyContract.deleteProperty([id]);
    res.json(result);
});

module.exports = router;
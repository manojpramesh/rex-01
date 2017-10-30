var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();
var propertyModel = require('../models/property.model');
var propertyContract = require('../ethereum/property.contract');

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads/" + req.folder);
    },
    filename: function(req, file, callback) {
        callback(null, req.folder + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("files");


// Get properties
router.get('/getProperties', function(req, res, next) {
    if (req.query.id != undefined) req.query.id = parseInt(req.query.id);
    if (req.query.bedrooms != undefined) req.query.bedrooms = parseInt(req.query.bedrooms);
    if (req.query.price != undefined) req.query.price = parseInt(req.query.price);
    if (req.query.baths != undefined) req.query.baths = parseInt(req.query.baths);
    propertyModel.searchProperty(req.query, (err, result) => {
        res.json(result);
    });
});

router.get('/getFeatured', function(req, res, next) {
    propertyModel.getRandomProperties(parseInt(req.query.count) || 10, (err, result) => {
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
        if (err) res.send(new Error("Mongo error!"));
        id += 1000;
        req.folder = id || "general";
        let dir = "./uploads/" + req.folder;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        upload(req, res, function(err) {
            if (err) res.send(err.stack);
            let data = req.body || {};
            data.id = id;
            data.status = 'forsale';
            data.txHash = propertyContract.addProperty([id, JSON.stringify(data)]);
            data.files = [];
            for (let i = 0; i < req.files.length; i++)
                data.files.push(req.files[i].path);
            propertyModel.addProperty(data, (err, result) => {
                res.json(data);
            });
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


router.get('/getLogs', (req, res, next) => {
    propertyContract.getEvents((err, result) => {
        res.json(result);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();

// Get all properties list
router.get('/getAllProperties', function(req, res, next) {
  res.json({});
});

// Filter property based on certain criteria
router.get('/searchProperty', function(req, res, next) {
  res.json({});
});

// Get details about a property
router.get('/getProperty', function(req, res, next) {
  res.json({});
});

// Change status of a property to sold
router.get('/changeStatus', function(req, res, next) {
  res.json({});
});

// Add a new property
router.post('/addProperty', function(req, res, next) {
  res.json({});
});

// Edit details about a property
router.post('/editProperty', function(req, res, next) {
  res.json({});
});

// Delete a property from list
router.post('/deleteProperty', function(req, res, next) {
  res.json({});
});

module.exports = router;

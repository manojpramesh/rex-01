const express = require('express');
const passport = require('passport');
const userModel = require('../models/user.model');
const router = express.Router();

router.get('/', function(req, res) {
    res.json('Working!!');
});

router.post('/signUp', (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };
    userModel.addUser(user, (result) => {
        res.json(true);
    });
});

router.post('/signIn', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

router.get('/profile', (req, res) => {
    res.json(req.user);
});


module.exports = router;
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json('Working!!');
});

router.post('/signUp', (req, res, next) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    }
    req.login(req.body, () => {
        res.redirect('/api/users/profile');
    });
});

router.get('/profile', (req, res, next) => {
    res.json(req.user);
});

router.post('/signIn', function(req, res, next) {
    res.json('true');
});

module.exports = router;
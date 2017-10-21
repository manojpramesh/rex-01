const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');

module.exports = () => {
    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, cb) => {
            let user = {
                email: email,
                password: password
            }
            userModel.searchUser(user, (result) => {
                if (result.length === 0)
                    cb("Incorrect username or password", null);
                cb(null, result);
            });
        }));
};
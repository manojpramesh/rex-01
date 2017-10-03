const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use(new localStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        (userName, password, done) => {
            let user = {
                userName: userName,
                password: password
            }
            done(null, user);
        }));
};
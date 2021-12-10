// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports= (passport) => {
    const authenticateUser = async (username, password, done) => {
          const user = await User.findOne({ username: username });

          if (!user) {
            console.log("Incorrect Username");
            return done(null, false, { message: 'Incorrect username.' });
          }
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            console.log("Incorrect Password");
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      }

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
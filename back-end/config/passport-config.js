const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/UserModel');
const passportLocalMongoose = require('passport-local-mongoose');

passport.use(new LocalStrategy({ usernameField: 'email' }, userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

module.exports = passport;
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var utils = require('../utils');
var pool = require('./db').pool;

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, done) {
            userProc.readByEmail(email).then(function(user) {
                if (!user) {
                    return done(null, false, { message: "error1"});
                }
                return utils.checkPassword(password, user.password)
                    .then(function(matches) {
                        if (matches) {
                            delete user.password;
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "error2" });
                        }
                    });
            }).catch(function (err) {
                return done(err);
            });
        }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userProc.read(id).then(function(user) {
            done(null, user);
        }, function (err) {
            done(err);
        });
    });

    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'random string!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

}

module.exports = configurePassport;
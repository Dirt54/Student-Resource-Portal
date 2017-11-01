var express = require('express');

var procedures = require('../procedures/users.proc');
var passport = require('passport');
var utils = require('../utils');
var auth = require('../middleware/auth.mw');

var router = express.Router();


router.route('/createusers')
.post(function (req, res) {
    var newPost = req.body;
    utils.encryptPassword(newPost.password)
        .then(function(hash) {
            return procedures.makeUser(newPost.firstname, newPost.lastname, newPost.email, hash, newPost.role, newPost.classStatus)
        }).then(function(user) {
            res.status(201).send(user);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});


router.route('/nonactive')
    .get(function(req, res) {
        procedures.allNonActiveUsers()
        .then(function(users) {
            res.send(users);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

    router.route('/active')
    .get(function(req, res) {
        procedures.allActiveUsers()
        .then(function(users) {
            res.send(users);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err); return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.send(user);
            }
        });
    })(req, res, next);
});



router.all('*', auth.isLoggedIn);

router.get('/me', function (req, res) {
    res.send(req.user);
});



// router.get('/', function (req, res) {
//     procedures.allUsers()
//         .then(function (users) {
//             res.send(users);
//         }, function (err) {
//             res.status(500).send(err);
//         })
// });

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/:id', auth.isAdmin, auth.isActive, function (req, res) {
    procedures.read(req.params.id)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.status(500).send(err);
        });
});


module.exports = router;
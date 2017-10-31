var express = require('express');

var procedures = require('../procedures/users.proc');
var users = require('../procedures/users.proc')
var passport = require('passport');
var utils = require('../utils');

var router = express.Router();


router.route('/createusers')
.post(function (req, res) {
    var newPost = req.body;
    utils.encryptPassword(newPost.password)
        .then(function(hash) {
            return procedures.makeUser(newPost.firstname, newPost.lastname, newPost.email, hash, newPost.role, newPost.status)
        }).then(function(user) {
            res.status(201).send(user);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
})


module.exports = router;
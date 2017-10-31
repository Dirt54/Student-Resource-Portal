var express = require('express');
var procedures = require('../procedures/labs.proc');

var router = express.Router();

router.route('/week/:week')
    .get(function (req, res) {
        procedures.fetch(req.params.week)
            .then(function (labs) {
                res.send(labs);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    });

router.route('/')
    .post(function (req, res) {
        var l = req.body;
        procedures.create(l.dayid, l.title, l.description, l.readmeURL, l.week)
            .then(function (id) {
                res.status(201).send(id)
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });


module.exports = router;

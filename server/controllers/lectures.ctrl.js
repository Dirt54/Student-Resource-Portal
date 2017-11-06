var express = require('express');
var procedures = require('../procedures/lectures.proc');

var router = express.Router();

router.route('/week/:week')
    .get(function (req, res) {
        procedures.fetch(req.params.week)
            .then(function (lecture) {
                res.send(lecture);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

router.route('/')
    .post(function (req, res) {
        var l = req.body;
        procedures.create(l.dayid, l.title, l.description, l.url, l.week)
            .then(function (id) {
                res.status(201).send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .get(function (req, res) {
        procedures.all()
            .then(function (lectures) {
                res.send(lectures);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })

router.route('/:id')
    .get(function (req, res) {
        var body = req.body;

        procedures.read(req.params.id)
            .then(function (lectures) {
                res.send(lectures);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })

    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function (id) {
                res.sendStatus(201);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .put(function (req, res) {
        
        var l = req.body;

        procedures.update(req.params.id, l.week, l.dayid, l.title, l.description, l.url)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })



module.exports = router;
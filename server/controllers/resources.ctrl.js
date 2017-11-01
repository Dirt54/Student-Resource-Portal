var express = require('express');
var procedures = require('../procedures/resources.proc');

var router = express.Router();

router.route('/')
    .post(function (req, res) {
        var r = req.body;
        procedures.create(r.orderid, r.title, r.description, r.url, r.categoryid)
            .then(function (id) {
                res.status(201).send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

router.route('/:id')
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
        var r = req.body;
        procedures.update(req.params.id, r.categoryid, r.orderid, r.title, r.description, r.url)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    });

router.route('/:categoryid')
    .get(function(req, res) {
        procedures.fetch(req.params.categoryid)
        .then(function(categories) {
            res.send(categories);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })

module.exports = router;
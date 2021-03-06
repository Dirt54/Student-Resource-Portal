var express = require('express');
var procedures = require('../procedures/resources.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

router.all('*', auth.isLoggedIn);

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
    })

    .get(function(req, res){
        procedures.all()
        .then(function(resources) {
            res.send(resources);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })

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
    })

    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(resource) {
            res.send(resource);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })



module.exports = router;
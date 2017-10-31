var users = require('./controllers/users.ctr');
var labs = require('./controllers/labs.ctrl');
var lectures = require('./controllers/lectures.ctrl');
var resources = require('./controllers/resources.ctrl');

var express = require('express');



var router = express.Router();

router.use('/users', users);
router.use('/labs', labs);
router.use('/lectures', lectures);
router.use('/resources', resources);



module.exports = router;
var users = require('./controllers/users.ctr');
var labs = require('./controllers/labs.ctrl')

var express = require('express');



var router = express.Router();

router.use('/users', users);
router.use('/labs', labs);



module.exports = router;
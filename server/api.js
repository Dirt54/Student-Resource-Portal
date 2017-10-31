var users = require('./controllers/users.ctr');

var express = require('express');



var router = express.Router();

router.use('/users', users);



module.exports = router;
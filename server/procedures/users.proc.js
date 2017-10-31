var db = require('../config/db');

exports.makeUser = function(firstname, lastname, email, password, role, status) {
    return db.row('newUser', [firstname, lastname, email, password, role, status]);
}
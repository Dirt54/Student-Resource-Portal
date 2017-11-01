var db = require('../config/db');

exports.makeUser = function(firstname, lastname, email, password, role, classStatus) {
    return db.row('newUser', [firstname, lastname, email, password, role, classStatus]);
}

exports.readByEmail = function(email) {
    return db.row('getUserByEmail', [email]);
}

exports.read = function(id) {
    return db.row('getUser', [id]);
}

exports.allNonActiveUsers = function() {
    return db.rows('getNonActiveUsers');
}

exports.allActiveUsers = function() {
    return db.rows('getActiveUsers');
}
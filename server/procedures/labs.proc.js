var db = require('../config/db.js');

exports.fetch = function (week) {
    return db.rows('getLabs', [week]);
}


exports.create = function (dayid, title, description, readmeURL, week) {
    return db.row('insertLab', [dayid, title, description, readmeURL, week]);
}


exports.destroy = function (id) {
    return db.empty('deleteLab', [id]);
}

exports.update = function (id, week, dayid, title, description, readmeURL) {
    return db.empty('updateLab', [id, week, dayid, title, description, readmeURL]);
}

exports.all = function() {
    return db.rows('getAllLabs');
}

exports.read = function(id) {
    return db.row('getLabById', [id])
}
var db = require('../config/db.js');

exports.fetch = function(week) {
    return db.rows('getLabs', [week]);
}


exports.create = function(dayid, title, description, readmeURL, week) {
    return db.row('insertLab', [dayid, title, description, readmeURL, week]);
}


exports.destroy = function(id) {
    return db.empty('deleteLab', [id]);
}
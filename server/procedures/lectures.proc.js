var db = require('../config/db.js');

exports.fetch = function(week) {
    return db.rows('getWeek', [week]);
}

exports.create = function(dayid, title, description, url, week) {
    return db.row('insertLecture', [dayid, title, description, url, week]);
}

exports.destroy = function(id) {
    return db.empty('deleteLecture', [id]);
}
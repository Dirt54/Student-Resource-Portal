var db = require('../config/db.js');

exports.fetch = function (week) {
    return db.rows('getWeek', [week]);
}

exports.create = function (dayid, title, description, url, week) {
    return db.row('insertLecture', [dayid, title, description, url, week]);
}

exports.destroy = function (id) {
    return db.empty('deleteLecture', [id]);
}

exports.update = function (id, week, dayid, title, description, url) {
    return db.empty('updateWeek', [id, week, dayid, title, description, url]);
}

exports.all = function() {
    return db.rows('getLectures');
}
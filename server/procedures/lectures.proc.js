var db = require('../config/db.js');



exports.getById = function (id) {
    return db.rows('getLectureById', [id]);
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

exports.read = function(id) {
    return db.row('getLectureById', [id]);
}
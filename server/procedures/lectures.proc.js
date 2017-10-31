var db = require('../config/db.js');

exports.fetch = function(week) {
    return db.rows('getWeek', [week]);
}


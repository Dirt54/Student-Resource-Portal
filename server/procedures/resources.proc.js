var db = require('../config/db.js');


exports.create = function (orderid, title, description, url, categoryid) {
    return db.row('insertResource', [orderid, title, description, url, categoryid]);
}

exports.destroy = function (id) {
    return db.empty('deleteResource', [id]);
}

exports.update = function (id, categoryid, orderid, title, description, url, categoryname) {
    return db.empty('updateResource', [id, categoryid, orderid, title, description, url]);
}

exports.fetch = function(categoryid) {
    return db.rows('getCategories', [categoryid])
}

exports.all = function() {
    return db.rows('getResources');
}

exports.read = function(id) {
    return db.row('getResourceById', [id])
}
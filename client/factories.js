angular.module('portal.factories', [])

.factory('Users', ['$resource', function ($resource) {
    return $resource('/api/users/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])

.factory('NonActiveUsers', ['$resource', function ($resource) {
    return $resource('/api/users/nonactive/:id');
}])

.factory('ActiveUsers', ['$resource', function ($resource) {
    return $resource('/api/users/active/:id');
}])

.factory('CreateUsers', ['$resource', function ($resource) {
    return $resource('/api/users/createusers/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])

.factory('Lecture', ['$resource', function($resource){
    return $resource('api/lectures/');
}])

.factory('Resource', ['$resource', function($resource) {
    return $resource('/api/resources/');
}])

.factory('Lab', ['$resource', function($resource) {
    return $resource('/api/labs/');
}])
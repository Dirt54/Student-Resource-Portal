angular.module('portal.factories', [])

.factory('Users', ['$resource', function ($resource) {
    return $resource('/api/users/:id');
}])

.factory('CreateUsers', ['$resource', function ($resource) {
    return $resource('/api/users/createusers/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])

.factory('LectureByWeek', ['$resource', function($resource) {
    return $resource('/api/lectures/week/:week');
}])

// .factory('Lecture', ['$resource', function($resource) {
//     return $resource('/api/lectures');
// }])

.factory('Resource', ['$resource', function($resource) {
    return $resource('/api/resources');
}])
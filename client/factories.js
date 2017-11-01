angular.module('portal.factories', [])

.factory('Users', ['$resource', function ($resource) {
    return $resource('/api/users/:id');
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

// .factory('LectureByWeek', ['$resource', function($resource) {
//     return $resource('/api/lectures/week/:week' , { week : '@week' }, {
//         query: {
//             method: 'GET',
//             url: '/api/lectures/week'
//         }
//     })
// }])

.factory('Lecture', ['$resource', function($resource) {
    return $resource('/api/lectures');
}])
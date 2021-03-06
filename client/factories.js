angular.module('portal.factories', [])

    .factory('Users', ['$resource', function ($resource) {
        return $resource('/api/users/:id', { id: '@id' }, {
            delete: {
                method: 'DELETE'
            }
        });
    }])

    .factory('NonActiveUsers', ['$resource', function ($resource) {
        return $resource('/api/users/nonactive/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
                
            }
        });
    }])

    .factory('ActiveUsers', ['$resource', function ($resource) {
        return $resource('/api/users/active/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('CreateUsers', ['$resource', function ($resource) {
        return $resource('/api/users/createusers/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('LoggedUser', ['$resource', function($resource){
        return $resource('/api/users/me');
    }])

    .factory('Lecture', ['$resource', function ($resource) {
        return $resource('api/lectures/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('Resource', ['$resource', function ($resource) {
        return $resource('/api/resources/:id' , { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('Lab', ['$resource', function ($resource) {
        return $resource('/api/labs/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])
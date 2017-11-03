angular.module('studentportal', ['ngRoute', 'ngResource', 'portal.controllers', 'portal.factories', 'portal.services'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
    .when('/loginfail', {
        templateUrl: 'loginfail.html'
    })
    .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeController'

    })
   
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'usersController'
    })
   
    .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'resourcesController'
    })
    
    .when('/syllabus', {
        templateUrl: 'views/syllabus.html',
        controller: 'syllabusController'
    })
    .when('/lectures', {
        templateUrl: 'views/lectures.html',
        controller: 'LecturesController'
    })
    .when('/labs', {
        templateUrl: 'views/labs.html',
        controller: 'labsController'
    })

}]);
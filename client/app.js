angular.module('studentportal', ['ngRoute', 'ngResource', 'portal.controllers', 'portal.factories', 'portal.services','smoothScroll'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            })

            .when('/welcome', {
                templateUrl: 'views/welcome.html',
                controller: 'welcomeController',
                requiresLogin: true,
            })

            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'usersController',
                requiresLogin: true,
                requiresAdmin: true,
                requiresActive: true
            })

            .when('/resources', {
                templateUrl: 'views/resources.html',
                controller: 'resourcesController',
                requiresLogin: true,
                requiresActive: true
            })

            .when('/syllabus', {
                templateUrl: 'views/syllabus.html',
                controller: 'syllabusController',
                requiresLogin: true,
            })
            .when('/lectures', {
                templateUrl: 'views/lectures.html',
                controller: 'LecturesController',
                requiresLogin: true,
                requiresActive: true
            })
            .when('/labs', {
                templateUrl: 'views/labs.html',
                controller: 'labsController',
                requiresLogin: true,
                requiresActive: true
            })
    }])
    .run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, previousRoute) {
            if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
                event.preventDefault();
                UserService.loginRedirect();
            } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
                event.preventDefault();
                $location.replace().path('/welcome');
            } else if (nextRoute.$$route.requiresActive && !UserService.isActive()) {
                $location.replace().path('/welcome');
            }
        });
    }]);
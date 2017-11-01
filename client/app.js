angular.module('studentportal', ['ngRoute', 'ngResource', 'portal.controllers', 'portal.factories', 'portal.services'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
  
    .when('/loginredirect'{
templateUrl: ' views/loginfail.html'

    })  
    .when ('/studentportal'{
templateUrl: 'views/welcome.html',
controller:''
})



}]);
angular.module('studentportal', ['ngRoute', 'ngResource', 'portal.controllers', 'portal.factories', 'portal.services'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
<<<<<<< HEAD
  
    .when('/loginredirect'{
templateUrl: ' views/loginfail.html'

    })  
    .when ('/studentportal'{
templateUrl: 'views/welcome.html',
controller:''
})



=======
    .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeController'
    })
>>>>>>> da3fe48b6256712f9fda090eb4a6dfca6d9f4175
}]);
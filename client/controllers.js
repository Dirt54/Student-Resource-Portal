angular.module('portal.controllers', [])

    .controller('loginController', ['$scope', '$location', '$routeParams', 'SEOService', function ($scope, $location, $routeparams, SEOService) {

        SEOService.setSEO({        
            title: 'Login',        
            image: 'http://'+$location.host() +'/images/',        
            url: $location.url(),        
            description: 'Please Login'    
        });
    }])
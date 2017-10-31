angular.module('portal.controllers', [])

    .controller('loginController', ['$scope', 'CreateUsers', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, CreateUsers, $location, $routeparams, UserService, SEOService) {
        $scope.createuser = CreateUsers.query();
       
        $scope.signup = function () {
            var payload = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                role: "user",
                status: "nonactive"
            };
            var c = new CreateUsers(payload);
            c.$save(function (success) {
                $scope.firstname = '';
                $scope.lastname = '';
                $scope.email = '';
                $scope.password = '';
            }, function (err) {
                console.log(err);
            });
        }

      

        SEOService.setSEO({        
            title: 'Login',        
            image: 'http://'+$location.host() +'/images/',        
            url: $location.url(),        
            description: 'Please Login'    
        });
    }])
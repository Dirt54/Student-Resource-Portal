angular.module('portal.controllers', [])

    .controller('loginController', ['$scope', 'CreateUsers', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, CreateUsers, $location, $routeParams, UserService, SEOService) {

        UserService.me().then(function (success) {
            redirect();
        });
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) {
                dest = '/welcome';
            }
            $location.replace().path(dest).search('dest', null);
        }

        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
        }
    


        $scope.signup = function () {
            var payload = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                role: "user",
                classStatus: "nonactive"
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
            image: 'http://' + $location.host() + '/images/',
            url: $location.url(),
            description: 'Please Login'
        });
    }])


    .controller('welcomeController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, $location, $routeParams, UserService, SEOService) {



        $scope.logout = function(){
            //Just clear values from scope
            $location.path('/api/users/logout');
        }
    

    }])

    .controller('LecturesController', ['$scope', 'Lecture', function($scope, Lecture) {
        $scope.hidden= true;



        $scope.show= function() {
           if (this.hidden===true) {
               this.hidden = false;
           }else {
               this.hidden = true;
           }
        }
        $scope.lectures = Lecture.query();
    }])


    .controller('usersController', ['$scope', 'NonActiveUsers', 'ActiveUsers', 'Users', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, NonActiveUsers, ActiveUsers, Users, $location, $routeParams, UserService, SEOService) {
        $scope.nonactiveuser = NonActiveUsers.query();
        $scope.activeuser = ActiveUsers.query();
        $scope.user = Users.get({ id: $routeParams.someId });



        $scope.activate = function () {
            $scope.user.$update(function() {
                $location.replace().path('/users');
            }, function(err) {
                console.log(err);
            });
        }


    }])

    .controller('resourcesController', ['$scope', 'Resource', function($scope, Resource) {
        $scope.hidden = true;
        $scope.resources = Resource.query();

        $scope.show= function() {
            if (this.hidden===true) {
                this.hidden = false;
            }else {
                this.hidden = true;
            }
         }
    }])

    .controller('labsController', ['$scope', 'Lab', function($scope, Lab) {
        $scope.hidden= true;
        $scope.labs = Lab.query();  
        
        $scope.show= function() {
            if (this.hidden===true) {
                this.hidden = false;
            }else {
                this.hidden = true;
            }
         }      
    }]);


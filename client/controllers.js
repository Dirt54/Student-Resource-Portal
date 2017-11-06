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


    .controller('logoutController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, $location, $routeParams, UserService, SEOService) {
        $scope.logout = function () {
            UserService.logout().then(function (success) {
                redirect();
            });
            function redirect() {
                $location.replace().path('/');
            }
        }
    }])


    .controller('welcomeController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, $location, $routeParams, UserService, SEOService) {

    }])


    .controller('LecturesController', ['$scope', 'Lecture', 'LoggedUser', '$location', '$route', function ($scope, Lecture, LoggedUser, $location, $route) {
        $scope.hidden = true;
        $scope.me = LoggedUser.get();
        
        $scope.save = function() {
            var l = new Lecture($scope.lectures);
            l.$save(function(){
                $route.reload();
            }, function(err) {
                console.log(err);
            })
        }

        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }
        $scope.lectures = Lecture.query();

        console.log($scope.lectures);

       

        $scope.update = function () {
            $scope.thisguy = Lecture.get({ id: this.l.id });
            console.log(this.l.id);
            console.log($scope.thisguy);
            $scope.thisguy.$update()
            .then(function () {
                
            }, function (err) {
                console.log(err);
            });
        }

    }])


    .controller('usersController', ['$scope', 'NonActiveUsers', 'ActiveUsers', 'Users', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, NonActiveUsers, ActiveUsers, Users, $location, $routeParams, UserService, SEOService) {
        $scope.nonactiveuser = NonActiveUsers.query();
        $scope.activeuser = ActiveUsers.query();


        $scope.activate = function () {
            $scope.thatguy = NonActiveUsers.get({ id: this.n.id });
            $scope.thatguy.$update({ id: this.n.id }, function () {
                $scope.nonactiveuser = NonActiveUsers.query();
                $scope.activeuser = ActiveUsers.query();
            }, function (err) {
                console.log(err);
            });
        }

        $scope.deleteNon = function () {
            if (confirm('Are you sure you want to delete this account?')) {
                $scope.eliminateNonActive = NonActiveUsers.get({ id: this.n.id })
                $scope.eliminateNonActive.$delete({ id: this.n.id }, function () {
                    $scope.nonactiveuser = NonActiveUsers.query();
                    $scope.activeuser = ActiveUsers.query();
                }, function (err) {
                    console.log(err);
                });
            }
        }

        $scope.deleteAct = function () {
            if (confirm('Are you sure you want to delete this account?')) {
                $scope.eliminateActive = ActiveUsers.get({ id: this.a.id })
                $scope.eliminateActive.$delete({ id: this.a.id }, function () {
                    $scope.activeuser = ActiveUsers.query();
                    $scope.nonactiveuser = NonActiveUsers.query();
                }, function (err) {
                    console.log(err);
                });
            }
        }
    }])

    .controller('resourcesController', ['$scope', 'Resource', 'LoggedUser', '$location', '$route', function ($scope, Resource, LoggedUser, $location, $route) {
        $scope.me = LoggedUser.get();
        $scope.hidden = true;
        $scope.resources = Resource.query();


        $scope.save = function() {
            var r = new Resource($scope.resources);
            r.$save(function(){
                $route.reload();
            }, function(err) {
                console.log(err);
            })
        }

        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }
    }])

    .controller('labsController', ['$scope', 'Lab', 'LoggedUser', '$location', '$route', function ($scope, Lab, LoggedUser, $location, $route) {
        $scope.me = LoggedUser.get();
        $scope.hidden = true;
        $scope.labs = Lab.query();


        $scope.save = function() {
            var r = new Lab($scope.labs);
            r.$save(function(){
                $route.reload();
            }, function(err) {
                console.log(err);
            })
        }


        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }

    }])


.controller('syllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope,  $location, $routeParams, UserService, SEOService) {
}])

.controller('frontendsyllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope,  $location, $routeParams, UserService, SEOService) {
}])
    
.controller('reactsyllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope,  $location, $routeParams, UserService, SEOService) {
}]);
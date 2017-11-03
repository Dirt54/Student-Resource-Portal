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


    .controller('LecturesController', ['$scope', 'Lecture', function ($scope, Lecture) {
        $scope.hidden = true;




        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }
        $scope.lectures = Lecture.query();
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

    .controller('resourcesController', ['$scope', 'Resource', function ($scope, Resource) {

        $scope.hidden = true;
        $scope.resources = Resource.query();

        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }
    }])

    .controller('labsController', ['$scope', 'Lab', function ($scope, Lab) {
        $scope.hidden = true;
        $scope.labs = Lab.query();

        $scope.show = function () {
            if (this.hidden === true) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        }

    }]);


// Smooth Scroll//
// .controller('syllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope,  $location, $routeParams, UserService, SEOService) {
//     
//     $('a[href^="#"]').on('click', function (e) {
//         e.preventDefault();
//         var target = this.hash;
//         var $target = $(target);
//         $('html, body').stop().animate({
//             scrollTop: $target.offset().top
//         }, 1500, 'swing');
//     });
// }]);

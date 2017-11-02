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
            
        
      

    }])












    .controller('welcomeController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, $location, $routeParams, UserService, SEOService) {



<<<<<<< HEAD

=======
        $scope.logout = function () {
            //Just clear values from scope
            $location.path('/api/users/logout');
        }
>>>>>>> 99c330f5e1fb6a9e88e7adfc1c7afb80d2607c63


    }])

<<<<<<< HEAD
    .controller('LecturesController', ['$scope', 'LectureByWeek', function ($scope, LectureByWeek) {
=======
    .controller('LecturesController', ['$scope', 'Lecture', function($scope, Lecture) {
        $scope.hidden= true;



        $scope.show= function() {
           if (this.hidden===true) {
               this.hidden = false;
           }else {
               this.hidden = true;
           }
        }
>>>>>>> 99c330f5e1fb6a9e88e7adfc1c7afb80d2607c63
        $scope.lectures = Lecture.query();
    }])


    .controller('usersController', ['$scope', 'NonActiveUsers', 'ActiveUsers', 'Users', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, NonActiveUsers, ActiveUsers, Users, $location, $routeParams, UserService, SEOService) {
        $scope.nonactiveuser = NonActiveUsers.query();
        $scope.activeuser = ActiveUsers.query();
 
        $scope.activate = function () {
<<<<<<< HEAD
            $scope.user.$update(function () {
                $location.replace().path('/users');
            }, function (err) {
                console.log(err);
=======
            $scope.thatguy = NonActiveUsers.get({ id: this.n.id });
            $scope.thatguy.$update({ id: this.n.id}, function() {
                $scope.nonactiveuser = NonActiveUsers.query();
                }, function (err) {
                    console.log(err);
>>>>>>> 99c330f5e1fb6a9e88e7adfc1c7afb80d2607c63
            });
        }

    }])

    .controller('resourcesController', ['$scope', 'ResourceByCategory', function ($scope, ResourceByCategory) {
        $scope.videos = ResourceByCategory.query({ categoryid: 1 });
        $scope.portfolio = ResourceByCategory.query({ categoryid: 2 });
        $scope.misc = ResourceByCategory.query({ categoryid: 3 });
    }])

    .controller('labsController', ['$scope', 'LabsByWeek', function ($scope, LabsByWeek) {
        $scope.week1 = LabsByWeek.query({ week: 1 });
        $scope.week2 = LabsByWeek.query({ week: 2 });
        $scope.week3 = LabsByWeek.query({ week: 3 });
        $scope.week4 = LabsByWeek.query({ week: 4 });
        $scope.week5 = LabsByWeek.query({ week: 5 });
        $scope.week6 = LabsByWeek.query({ week: 6 });
        $scope.week7 = LabsByWeek.query({ week: 7 });
        $scope.week8 = LabsByWeek.query({ week: 8 });
        $scope.week9 = LabsByWeek.query({ week: 9 });
        $scope.week10 = LabsByWeek.query({ week: 10 });
<<<<<<< HEAD
=======
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
>>>>>>> 99c330f5e1fb6a9e88e7adfc1c7afb80d2607c63
    }]);


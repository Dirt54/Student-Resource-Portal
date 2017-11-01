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

    .controller('LecturesController', ['$scope', 'LectureByWeek', function($scope, LectureByWeek) {
        $scope.week1 = LectureByWeek.query({ week: 1 });
        $scope.week2 = LectureByWeek.query({ week: 2 });
        $scope.week3 = LectureByWeek.query({ week: 3 });
        $scope.week4 = LectureByWeek.query({ week: 4 });
        $scope.week5 = LectureByWeek.query({ week: 5 });
        $scope.week6 = LectureByWeek.query({ week: 6 });
        $scope.week7 = LectureByWeek.query({ week: 7 });
        $scope.week8 = LectureByWeek.query({ week: 8 });
        $scope.week9 = LectureByWeek.query({ week: 9 });
        $scope.week10 = LectureByWeek.query({ week: 10 });
    }])

<<<<<<< HEAD
    .controller('resourcesController', ['$scope', 'ResourceByCategory', function($scope, ResourceByCategory) {
        $scope.videos = ResourceByCategory.query({ categoryid: 1 });
        $scope.portfolio = ResourceByCategory.query({ categoryid: 2 });
        $scope.misc = ResourceByCategory.query({ categoryid: 3 });
    }])

    .controller('labsController', ['$scope', 'LabsByWeek', function($scope, LabsByWeek) {
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
=======
    .controller('ResourcesController', ['$scope', 'Resource', function($scope, Resource) {
        $scope.resources = Resource.query();
>>>>>>> 3ce82aad4b043bd37253a3fcf145f0cfdccf9184
    }])

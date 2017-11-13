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
            title: 'Covalence Student Resource Login',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'Login page for the Covalence Student Resource Portal'
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


    .controller('welcomeController', ['$scope', '$location', '$routeParams', 'UserService', 'LoggedUser', 'SEOService', function ($scope, $location, $routeParams, UserService, LoggedUser, SEOService) {
        $scope.me = LoggedUser.get();


        SEOService.setSEO({
            title: 'Covalence Student Resource Welcome Page',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'Welcome to the Covalence Student Resource Portal.'
        });
    }])


    .controller('LecturesController', ['$scope', 'Lecture', 'LoggedUser', '$location', '$route', 'SEOService', function ($scope, Lecture, LoggedUser, $location, $route, SEOService) {
        $scope.hidden = true;
        $scope.me = LoggedUser.get();

        // document.getElementById('scrollbox1').scrollspy({ target: document.getElementById('list-example') });

        $scope.save = function () {
            var l = new Lecture($scope.lectures);
            l.$save(function () {
                $route.reload();
            }, function (err) {
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




        $scope.update = function () {
            (console.log(this));
            this.l.$update(function () {
                $scope.lectures = Lecture.query();
            }, function (err) {
                console.log(err)
            })

        }

        $scope.delete = function () {
            if (confirm('Are you sure you want to delete this?')) {
                $scope.thisthing = Lecture.get({ id: this.l.id });
                $scope.thisthing.$delete({ id: this.l.id })
                    .then(function () {
                        $scope.lectures = Lecture.query();
                    }, function (err) {
                        console.log(err);
                    })
            }
        }

        SEOService.setSEO({
            title: 'Covalence Student Resource Lectures',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'Access lectures from your Covalence courses.'
        });

    }])


    .controller('usersController', ['$scope', 'NonActiveUsers', 'ActiveUsers', 'Users', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, NonActiveUsers, ActiveUsers, Users, $location, $routeParams, UserService, SEOService) {
        $scope.nonactiveuser = NonActiveUsers.query();
        $scope.activeuser = ActiveUsers.query();


        $scope.activate = function () {
            NonActiveUsers.get({ id: this.n.id }, function (user) {
                console.log(user);
                user.$update().then(function() {
                $scope.nonactiveuser = NonActiveUsers.query();
                $scope.activeuser = ActiveUsers.query();
                });
            })
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

        SEOService.setSEO({
            title: 'Covalence Student Resource Portal Users',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'User management page for Covalence instructors and admins.'
        });

    }])

    .controller('resourcesController', ['$scope', 'Resource', 'LoggedUser', '$location', '$route', 'SEOService', function ($scope, Resource, LoggedUser, $location, $route, SEOService) {
        $scope.me = LoggedUser.get();
        $scope.hidden = true;
        $scope.resources = Resource.query();


        $scope.save = function () {
            var r = new Resource($scope.resources);
            r.$save(function () {
                $route.reload();
            }, function (err) {
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

        $scope.delete = function () {
            if (confirm('Are you sure you want to delete this?')) {
                $scope.thisthing = Resource.get({ id: this.r.id });
                $scope.thisthing.$delete({ id: this.r.id })
                    .then(function () {
                        $scope.resources = Resource.query();
                    }, function (err) {
                        console.log(err);
                    })
            }
        }

        $scope.update = function () {
            (console.log(this));
            this.r.$update(function () {
                $scope.resources = Resource.query();
            }, function (err) {
                console.log(err)
            })

        }

        SEOService.setSEO({
            title: 'Covalence Student Portal: Resources',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'Extra resources to aid students while they attend Covalence courses.'
        });


       
    }])

    .controller('labsController', ['$scope', 'Lab', 'LoggedUser', '$location', '$route', 'SEOService', function ($scope, Lab, LoggedUser, $location, $route, SEOService) {
        $scope.me = LoggedUser.get();
        $scope.hidden = true;
        $scope.labs = Lab.query();


        $scope.save = function () {
            var r = new Lab($scope.labs);
            r.$save(function () {
                $route.reload();
            }, function (err) {
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

        $scope.delete = function () {
            if (confirm('Are you sure you want to delete this?')) {
                $scope.thisthing = Lab.get({ id: this.l.id });
                $scope.thisthing.$delete({ id: this.l.id })
                    .then(function () {
                        $scope.labs = Lab.query();
                    }, function (err) {
                        console.log(err);
                    })
            }
        }

        $scope.update = function () {
            this.l.$update(function () {
                $scope.labs = Lab.query();
            }, function (err) {
                console.log(err)
            })

        }

        SEOService.setSEO({
            title: 'Labs',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: 'Course Labs'
        });


    }])


    .controller('syllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', 'LoggedUser', function ($scope, $location, $routeParams, UserService, SEOService, LoggedUser) {
        $scope.me = LoggedUser.get();

        SEOService.setSEO({
            title: 'Covalence Full Stack Course Syllabus',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: "Course syllabus for Covalence's Full Stack Development program."
        });
    }])

    .controller('frontendsyllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', 'LoggedUser', function ($scope, $location, $routeParams, UserService, SEOService, LoggedUser) {
        $scope.me = LoggedUser.get();

        SEOService.setSEO({
            title: 'Covalence Front End Syllabus',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: "Course syllabus for Covalence's Front End Fundamentals program."
        });
    }])

    .controller('reactsyllabusController', ['$scope', '$location', '$routeParams', 'UserService', 'SEOService', 'LoggedUser', function ($scope, $location, $routeParams, UserService, SEOService, LoggedUser) {
        $scope.me = LoggedUser.get();


        SEOService.setSEO({
            title: 'Covalence React Native Course Syllabus',
            image: 'http://' + $location.host() + '/images/favicon-20171103083357746.ico',
            url: $location.url(),
            description: "Course syllabus for Covalence's React Native program."
        });
    }]);
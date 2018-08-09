app.config(function ($stateProvider, $urlRouterProvider) { //configuration of the routing process
    $urlRouterProvider.otherwise('/home/login'); //if the link is wrong direct to the login page

    $stateProvider //states of the application 
        .state("home.login", { // login state
            url: "/login",
            templateUrl: "html/login.html",
            controller: "loginController"
        }).state("home", { //home state which is the index page
            url: "/home",
            templateUrl: "index.html"
        }).state("home.main", { //main page where it will contains all other pages
            url: "/main",
            templateUrl: "html/main.html",
            controller: "mainController",
            resolve: { //if user has no access it will redirect to the login page
                validate: function ($q, $cookies, $rootScope, $state) {
                    var defer = $q.defer();
                    if ($cookies.get("token") !== undefined) {
                        defer.resolve();
                    } else {
                        $state.go("home.login");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.users", { //users page
            url: "/users",
            templateUrl: "html/users.html",
            controller: "usersController",
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("userAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.addUser", { //add user page
            url: "/adduser",
            templateUrl: "html/addUser.html",
            controller: "addUserController",
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("userAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.editUser", { //edit user page
            url: "/editUser/:id",
            templateUrl: "html/editUser.html",
            controller: "editUserController",
            params: {
                user: null
            },
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("userAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.homeVideos", { // non-premium videos page
            url: "/homeVideos",
            templateUrl: "html/homevideos.html",
            controller: "videosController"
        }).state("home.main.addVideo", { //add a non-premium video page
            url: "/addHomeVideo",
            templateUrl: "html/addvideo.html",
            controller: "addVideoController"
        }).state("home.main.editVideo", { //edit a non-premium video page
            url: "/editHomeVideo/:id",
            templateUrl: "html/editvideo.html",
            controller: "editVideoController",
            params: {
                video: null
            }
        }).state("home.main.premium", { //premium videos page
            url: "/premiums",
            templateUrl: "html/premiums.html",
            controller: "premiumsController",
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("premiumAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.addPremium", { //add a premium video page
            url: "/addPremium",
            templateUrl: "html/addpremium.html",
            controller: "addPremiumController",
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("premiumAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        }).state("home.main.editPremium", { // edit a premium video page
            url: "/editPremium/:id",
            templateUrl: "html/editpremium.html",
            controller: "editPremiumController",
            params: {
                video: null
            },
            resolve: {
                validate: function ($q, $cookies, $rootScope) {
                    var defer = $q.defer();
                    if ($cookies.get("premiumAccess")===true) {
                        defer.resolve();
                    } else {
                        alert("You don't have access to this page");
                        defer.reject("Access Blocked");
                    }
                    return defer.promise;
                }
            }
        });
});
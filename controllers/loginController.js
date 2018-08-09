app.controller('loginController',function ($scope, SERVER, $http, $state, $cookies) { // login controller

    $scope.username;
    $scope.password;
    $scope.wrong = false;
    $scope.login = function () { //login function
        $http({ //send user credentials to the server to authenticate
            url: SERVER + 'login',
            method: "POST",
            data: { "username": $scope.username, "password": $scope.password }
        })
            .then(function (response) {
                if (response.data[0] !== undefined) { //if user exists with the right username and password
                    $cookies.putObject("token",response.data[0]._id);
                    $state.go("home.main.homeVideos"); //redirect to the home page with non-premium videos in
                }
                else {
                    alert("Wrong Username or Password"); //if user doesn't exist 
                }
            },
                function (response) {
                    console.log("fail");
                });
    }

});
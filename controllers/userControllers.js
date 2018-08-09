app.controller('usersController', function ($scope, SERVER, $http, $state) { //view of users controller

    $http({ //get all the users
        url: SERVER + "users",
        method: "GET"
    }).then(function (response) {
        $scope.users = response.data;
    });
    $scope.searchValue = "";
    $scope.search = function (search) {
        if (search != "") {
            $http({
                url: SERVER + "users",
                method: "GET",
                params: { "search": search }
            }).then(function (response) {
                $scope.users = response.data;
            })
        }
        else {
            $http({
                url: SERVER + "users",
                method: "GET"
            }).then(function (response) {
                $scope.users = response.data;
            });
        }
    }

    $scope.deleteUser = function(id){
        $http.delete(SERVER + "deleteUser?id="+id).then(
            function(){
                $state.reload();
            });
    };
});

app.controller('addUserController', function ($scope, SERVER, $http, $state) { //adding a user controller
    $scope.addUser = function () {
        if ($scope.user.name === undefined || $scope.user.username === undefined || $scope.user.password === undefined) {

        } else {
            $http({
                url: SERVER + "addUser",
                method: "POST",
                data: { "user": $scope.user }
            }).then(function(result){
                    $state.go("home.main.users");
            }, function(response){
                alert("Username exists!!");
            });
        }
    }

});

app.controller('editUserController', function ($scope, SERVER, $http, $state,$stateParams) { //editting a user controller
    $http({
        url: SERVER + "users",
        method: "GET",
        params: {"id": $stateParams.user}
    }).then(function(response){
        $scope.user = response.data[0];
    });
    $scope.postUser = function () {
        if ($scope.user.name === undefined || $scope.user.username === undefined || $scope.user.password === undefined) {

        } else {
            $http({
                url: SERVER + "editUser",
                method: "POST",
                data: { "user": $scope.user }
            }).then(function(result){
                    $state.go("home.main.users");
            }, function(response){
                alert("Username exists!!");
            });
        }
    }

});
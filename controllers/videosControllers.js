app.controller('videosController', function ($scope, SERVER, $http, $state, $cookies) { //non-premium videos controller
    $http({ //get all the non-premium videos
        url: SERVER + "videos",
        method: "GET",
    }).then(function (response) {
        $scope.videos = response.data;
    });

    $scope.search = function (search) {
        if (search != "") { //if search is filled get videos that matches the string written
            $http({
                url: SERVER + "videos",
                method: "GET",
                params: { "search": search }
            }).then(function (response) {
                $scope.videos = response.data;
            })
        }
        else { //if not get all non-premium videos
            $http({
                url: SERVER + "videos",
                method: "GET"
            }).then(function (response) {
                $scope.videos = response.data;
            });
        }
    }

    $scope.deleteVideo = function (id) { //delete video
        $http.delete(SERVER + "deleteVideo?id=" + id).then(
            function () {
                $state.reload();
            });
    };
});

app.controller('addVideoController', function ($scope, SERVER, $http, $state) {//adding a non-premium controller
    $scope.addVideo = function () {
        if ($scope.video.title === undefined || $scope.video.director === undefined) { //if title or director is not filled don't create video document

        } else { //create video 
            if (typeof $scope.video.actors == "string") {
                $scope.video.actors = $scope.video.actors.split(',');
            }
            $http({
                url: SERVER + "addVideo",
                method: "POST",
                data: { "video": $scope.video }
            }).then(function (result) {
                $state.go("home.main.homeVideos");
            });
        }
    }
});

app.controller('editVideoController', function ($scope, SERVER, $http, $state,$stateParams) { //editting a user controller
    $http({//get the required video 
        url: SERVER + "videos",
        method: "GET",
        params: {"id": $stateParams.video}
    }).then(function(response){
        $scope.video = response.data[0];
    });
    $scope.postVideo = function () {//post the the changes to the server
        if ($scope.video.title === undefined || $scope.video.director === undefined) {

        } else {
            $http({
                url: SERVER + "editVideo",
                method: "POST",
                data: { "video": $scope.video }
            }).then(function(result){
                    $state.go("home.main.homeVideos");
            });
        }
    }

});

app.controller('premiumsController', function ($scope, SERVER, $http, $state, $cookies) {
    $http({
        url: SERVER + "premiums",
        method: "GET",
    }).then(function (response) {
        $scope.videos = response.data;
    });

    $scope.search = function (search) {
        if (search != "") {
            $http({
                url: SERVER + "premiums",
                method: "GET",
                params: { "search": search }
            }).then(function (response) {
                $scope.videos = response.data;
            })
        }
        else {
            $http({
                url: SERVER + "premiums",
                method: "GET"
            }).then(function (response) {
                $scope.videos = response.data;
            });
        }
    }

    $scope.deleteVideo = function (id) {
        $http.delete(SERVER + "deleteVideo?id=" + id).then(
            function () {
                $state.reload();
            });
    };
});

app.controller('addPremiumController', function ($scope, SERVER, $http, $state) {
    $scope.addVideo = function () {
        if ($scope.video.title === undefined || $scope.video.director === undefined) {

        } else {
            if (typeof $scope.video.actors == "string") {
                $scope.video.actors = $scope.video.actors.split(',');
            }
            $http({
                url: SERVER + "addPremium",
                method: "POST",
                data: { "video": $scope.video }
            }).then(function (result) {
                $state.go("home.main.premium");
            });
        }
    }
});

app.controller('editPremiumController', function ($scope, SERVER, $http, $state,$stateParams) { //editting a user controller
    $http({
        url: SERVER + "premiums",
        method: "GET",
        params: {"id": $stateParams.video}
    }).then(function(response){
        $scope.video = response.data[0];
    });
    $scope.postVideo = function () {
        if ($scope.video.title === undefined || $scope.video.director === undefined) {

        } else {
            $http({
                url: SERVER + "editVideo",
                method: "POST",
                data: { "video": $scope.video }
            }).then(function(result){
                    $state.go("home.main.homeVideos");
            });
        }
    }

});
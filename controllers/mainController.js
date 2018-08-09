app.controller('mainController', function ($scope, SERVER, $rootScope, $http,$cookies,$state) { //main controller for permission coordination
    $http({ //to get user permissions from server
        url: SERVER + "user",
        method: "POST",
        data: {"id" : $cookies.get("token")}
    }).then(function (response) { //assign permissions in cookies and in rootscope to allow and disallow certain pages
            $scope.name = response.data[0].name;
            $cookies.putObject("premiumAccess",response.data[0].premiumAccess);
            $cookies.putObject("userAccess",response.data[0].userAccess);
            $rootScope.premiumAccess = $cookies.get("premiumAccess");
            $rootScope.userAccess = $cookies.get("userAccess");
        }
        );

    $scope.logout = function(){ //remove cookies when logging out
        $cookies.remove("token");
        $cookies.remove("premiumAccess");
        $cookies.remove("userAccess");
    };
});




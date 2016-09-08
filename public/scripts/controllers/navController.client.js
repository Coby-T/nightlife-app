angular.module('nightlifeApp').controller("navbarController", function($scope, $rootScope) {
    
    $scope.isLoggedIn = function () {
        return $rootScope.user;
    };
    
});
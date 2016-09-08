angular.module('nightlifeApp').controller("searchController", function($scope, $http, $rootScope, $rootParams) {
    
    $scope.currentUser = $rootScope.user;
    var location = $scope.rootParams.location;
    var state;
    var lookup = [];
    
    $scope.bars =[];
    
    $http({
        method: 'GET',
        url: '/api/search?location=' + location
    }).then(function (res) {
        state = res[0].location.state_code;
        for (var i = 0; i < res.length; i++) {
            $scope.bars.push({
                image_url: res[i].image_url,
                name: res[i].name,
                snippet_text: res[i].snippet_text,
                value: i
            });
            lookup.push(res[i].name);
        }
        
        $http({
            method: 'GET',
            url: '/api/goinglist/' + state
        }).then(function (res2) {
            for (var i = 0; i < res2.length; i++ ) {
                if(lookup.indexOf(res2[i].barName)) {
                    $scope.bars[i].going = res2[i].goingNumber;
                    $scope.bars[i].userGoing = res2[i].indexOf($scope.currentUser) !== -1;
                }
                else {
                    $scope.bars[i].going = 0;
                    $scope.bars[i].userGoing = false;
                }
            }
        });
        
    });
    
    $scope.toggleGoing = function (index) {
        
        if ($scope.currentUser) {
            $http({
                method: 'POST',
                url: '/api/goinglist/USA',
                data: {
                    name: $scope.bars[index].name,
                    state: state
                }
            });
            if ($scope.bars[index].userGoing) {
                $scope.bars[index].going--;
            }
            else {
                $scope.bars[index].going++;
            }
            $scope.bars[index].userGoing = !$scope.bars[index].userGoing;
        }
        else {
            window.location = '/auth/twitter';
        }
        
    };
    
    
    
});
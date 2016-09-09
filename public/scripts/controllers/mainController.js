angular.module('nightlifeApp',[]).controller("mainController", function($scope, $http) {
    
    var lookup = [];
    var state = "";
    
    $scope.barlist =[];
    
    $http({
        method: 'GET',
        url: '/api/loggedin'
    }).then(function (res) {
        if (res.data.user) {
            $scope.currentUser = true;
        }
    });
    
    // synchronus GET to fetch list of bars from Yelp and bars with people going
    $scope.submitSearch = function (query) {
        
        var location = document.getElementById("search-form").value;

        $http({
            method: 'GET',
            url: '/api/search?location=' + location
        }).then(function (res) {
            state = res.data[0].location.state_code;
            for (var i = 0; i < res.data.length; i++) {
                $scope.barlist.push({
                    image_url: res.data[i].image_url,
                    name: res.data[i].name,
                    snippet_text: res.data[i].snippet_text,
                    value: i
                });
                lookup.push(res.data[i].name);
            }
            
            $http({
                method: 'GET',
                url: '/api/goinglist/' + state
            }).then(function (res2) {
                console.log(res2)
                for (var i = 0; i < res2.data.length; i++ ) {
                    if(lookup.indexOf(res2.data[i].barName)) {
                        $scope.barlist[i].going = res2.data[i].goingNumber;
                        $scope.barlist[i].userGoing = res2.data.indexOf($scope.currentUser) !== -1;
                    }
                    else {
                        $scope.barlist[i].going = 0;
                        $scope.barlist[i].userGoing = false;
                    }
                }
            });
            
        });
        
    };

    $scope.toggleGoing = function (index) {
        
        if ($scope.currentUser) {
            $http({
                method: 'POST',
                url: '/api/goinglist/USA',
                data: {
                    name: $scope.barlist[index].name,
                    state: state
                }
            });
            if ($scope.barlist[index].userGoing) {
                $scope.barlist[index].going--;
                console.log($scope.barlist[index])
            }
            else {
                $scope.barlist[index].going++;
                console.log($scope.barlist[index])
            }
            $scope.barlist[index].userGoing = !$scope.barlist[index].userGoing;
        }
        else {
            window.location = '/auth/twitter';
        }
        
    };
    
    $scope.changeUserStatus = function () {
        $scope.currentUser = !$scope.currentUser;
    };
    
});
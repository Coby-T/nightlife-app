angular.module('nightlifeApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/search/:location', {
                templateUrl: "/views/barlist.html",
                controller: "searchController",
                access: {
                    restricted: false
                }
            });
    });
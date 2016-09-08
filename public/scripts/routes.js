angular.module('nightlifeApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/search/:location', {
                templateUrl: "/templates/barlist.html",
                controller: "searchController",
                access: {
                    restricted: false
                }
            });
    });
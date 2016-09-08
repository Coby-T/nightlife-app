angular.module('nightlifeApp', ['ngRoute']).run(function ($rootScope, $location, $route, myServices) {
   $rootScope.$on('$routeChangeStart', function (event, next, current) {
       myServices.getUserStatus();
       if (next.access) {
           if (next.access.restricted && !myServices.isLoggedIn()) {
               $location.path('/');
               $route.reload();
           }
       }
   });
});
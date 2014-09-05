'use strict';

angular.module('myApp.arbitrary', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/arbitrary', {
    templateUrl: 'views/arbitrary/arbitrary.html',
    controller: 'ArbitraryLocationCtrl'
  });
}])

.controller('ArbitraryLocationCtrl', [function() {

}]);

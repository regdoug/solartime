'use strict';

angular.module('myApp.local', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/local', {
    templateUrl: 'views/local/local.html',
    controller: 'LocalLocationCtrl'
  });
}])

.controller('LocalLocationCtrl', [function() {

}]);

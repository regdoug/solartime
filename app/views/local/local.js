'use strict';

angular.module('myApp.local', ['ngRoute','geolocation'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/local', {
    templateUrl: 'views/local/local.html',
    controller: 'LocalLocationCtrl'
  });
}])

.controller('LocalLocationCtrl', ['$scope', 'geolocation', function($scope,geolocation) {
    geolocation.getLocation().then(function(data){
        $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
        $scope.time = new Date();
    }, function(reason) {
        $scope.coords = false;
        $scope.geoError = reason;
    });
}]);

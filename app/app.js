'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.solartime',
  //'myApp.about',
  'myApp.equations',
  'myApp.version',
  'geolocation'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('LocationCtrl', ['$scope', 'geolocation', function($scope,geolocation) {
    // Set up variables
    $scope.coords = { lat: 0, longitude:-77 };
    $scope.localTime = Date.present();
    $scope.time = $scope.localTime;

    // Use geolocation API to find location
    $scope.geoError = "ok";
    geolocation.getLocation().then(function(data){
        $scope.coords.local = {lat: data.coords.latitude, longitude: data.coords.longitude};
        $scope.coords.lat = data.coords.latitude;
        $scope.coords.longitude = data.coords.longitude;
    }, function(reason) {
        $scope.coords.local = false;
        $scope.geoError = reason;
    });

    $scope.$watch('coords.user.lat', function(newLat, oldLat) {
        //console.log("watching coords.user.lat "+newLat+" "+oldLat);
        var _userLat = parseFloat(newLat);
        if (isNaN(_userLat)) {
            if ( $scope.coords.local ) {
                // If nothing valid has been typed and local latitude is available, use that
                $scope.coords.lat = $scope.coords.local.lat;
            }
        } else {
            // If a number has been typed, use that
            $scope.coords.lat = _userLat;
        }
    });

    $scope.$watch('coords.user.longitude', function(newLong, oldLong) {
        var _userLong = parseFloat(newLong);
        if (isNaN(_userLong)) {
            if ( $scope.coords.local ) {
                // If nothing valid has been typed and local longitude is available, use that
                $scope.coords.longitude = $scope.coords.local.longitude;
            }
        } else {
            // If a number has been typed, use that
            $scope.coords.longitude = _userLong;
        }
    });

    $scope.$watch('userTime', function(newTimeStr, oldTimeStr) {
        // Parse with date.js
        // It is pretty forgiving, so I think users will be able to figure it out
        var newDate = Date.parse(newTimeStr);
        if (newDate === null) {
            $scope.time = $scope.localTime;
        } else {
            $scope.time = newDate;
        }
    });
}]);


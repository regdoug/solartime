'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.solartime',
  //'myApp.about',
  'myApp.version',
  'geolocation'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('LocationCtrl', ['$scope', 'geolocation', function($scope,geolocation) {
    // Set up variables
    $scope.coords = {};

    // Use geolocation API to find location
    $scope.geoError = "ok";
    geolocation.getLocation().then(function(data){
        $scope.coords.local = {lat: data.coords.latitude, long: data.coords.longitude};
        $scope.localTime = Date.present();
    }, function(reason) {
        $scope.coords.local = false;
        $scope.geoError = reason;
    });

    // Set up getter/setter methods
    var _userLat, _userLong, _userTime;
    $scope.coords.user = {
        lat: function(newLat) {
            if (angular.isDefined(newLat)) {
                _userLat = newLat;
                if (newLat === '') {
                    if ( $scope.coords.local ) {
                        // If nothing has been typed and local latitude is available, use that
                        $scope.coords.lat = $scope.coords.local.lat;
                    }
                } else {
                    // If something has been typed, use that
                    $scope.coords.lat = parseFloat(_userLat);
                }
            }
            return _userLat;
        },
        long: function(newLong) {
            if (angular.isDefined(newLong)) {
                _userLong = newLong;
                if (newLong === '') {
                    if ( $scope.coords.local ) {
                        // If nothing has been typed and local longitude is available, use that
                        $scope.coords.long = $scope.coords.local.long;
                    }
                } else {
                    // If something has been typed, use that
                    $scope.coords.long = parseFloat(_userLong);
                }
            }
            return _userLong;
        }
    };
    $scope.userTime = function(newTime){
        if (angular.isDefined(newTime)) {
            _userTime = newTime;
            // date.js has great parsing features
            var newDate = Date.parse(newTime);
            if (newDate !== null) {
                $scope.time = newDate;
            }
        }
        return _userTime;
    };
        
}]);

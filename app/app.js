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
    $scope.coords = { lat: 0, long:0 };
    $scope.localTime = Date.present();
    $scope.time = $scope.localTime;

    // Use geolocation API to find location
    $scope.geoError = "ok";
    geolocation.getLocation().then(function(data){
        $scope.coords.local = {lat: data.coords.latitude, long: data.coords.longitude};
        $scope.coords.lat = data.coords.latitude;
        $scope.coords.long = data.coords.longitude;
    }, function(reason) {
        $scope.coords.local = false;
        $scope.geoError = reason;
    });

    $scope.watch('coords.user.lat', function(newLat, oldLat) {
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

    $scope.watch('coords.user.long', function(newLong, oldLong) {
        var _userLong = parseFloat(newLong);
        if (isNaN(_userLong)) {
            if ( $scope.coords.local ) {
                // If nothing valid has been typed and local longitude is available, use that
                $scope.coords.long = $scope.coords.local.long;
            }
        } else {
            // If a number has been typed, use that
            $scope.coords.long = _userLong;
        }
    });

    $scope.watch('userTime', function(newTimeStr, oldTimeStr) {
        // Parse with date.js
        // It is pretty forgiving, so I think users will be able to figure it out
        var newDate = Date.parse(newTimeStr);
        if (newDate === null) {
            $scope.time = $scope.localTime;
        } else {
            $scope.time = newDate;
        }
    });
}])

.controller('InputCtrl', ['$rootScope', function($scope) {
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
    $scope.userTime = (function(newTime){
        if (angular.isDefined(newTime)) {
            _userTime = newTime;
            // date.js has great parsing features
            var newDate = Date.parse(newTime);
            if (newDate !== null) {
                $scope.time = newDate;
            }
        }
        return _userTime;
    }());
        
}]);

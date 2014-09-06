'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.local',
  'myApp.arbitrary',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/local'});
}])
.controller('SolarTimeCtrl', ['$scope', function($scope) {
    // Compute solar times
    var calcTimes = function() {
        if($scope.coords && $scope.coords.lat && $scope.coords.long && $scope.time) {
            // set up helper functions
            var radians = function(degrees) { return degrees * Math.PI / 180; }
            var degrees = function(radians) { return radians / Math.PI * 180; }

            // Initialize internal numbers
            var n = $scope.time.getOrdinalNumber(),
                B = 2*Math.PI*($scope.misc.dayOfYear - 81)/364,
                E = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B),
                L = radians($scope.coords.lat),
                LL = radians($scope.coords.long),
                LTM = radians($scope.time.getTimezoneOffset()/4);

            // Solar time offset (min)
            var off = degrees(LTM - LL)*4 + E;
            // Compute solar time
            $scope.solarTime = $scope.time.add({"minutes": off});

            // Solar angle
            $scope.solarAngle = (12 - $scope.solarTime.getHours())*15 + (60 - $scope.solarTime.getMinutes())/4.0 + (1000 - $scope.solarTime.getMilliseconds())/4000.0;
            var H = radians($scope.solarAngle);


            // Declination in radians
            var delta = radians(23.45)*Math.sin(2*Math.PI*(n-81)/365);
            // altitude and azimuth
            var sinBeta = Math.cos(L)*Math.cos(delta)*Math.cos(H) + Math.sin(L)*Math.sin(delta);
            var beta = Math.asin(sinBeta);
            var sinPhi = Math.cos(delta)*Math.sin(H)/Math.cos(beta);
            var phi = Math.asin(sinPhi);
            var check = Math.cos(H) > Math.tan(delta)/Math.tan(L);
            if( check === false ) {
                phi = Math.PI + (Math.PI - phi);
            }

            $scope.declination = degrees(delta);
            $scope.altitudeNoon = 90 - $scope.coords.lat + $scope.declination;
            $scope.altitude = degrees(beta);
            $scope.azimuth = degrees(phi);
        }
    };
    $scope.watch('time', calcTimes);
    $scope.watch('coords', calcTimes);
}]);

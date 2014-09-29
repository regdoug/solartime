'use strict';

angular.module('myApp.equations', ['ngRoute','ngSanitize','myApp.solartime'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/equations', {
    templateUrl: 'views/equations/equations.html',
    controller: 'SolarTimeCtrl'
  });
}]);


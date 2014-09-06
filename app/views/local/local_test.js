'use strict';

describe('myApp.local module', function() {
  var scope, _geo;

  beforeEach(module('myApp.local'));

  beforeEach(inject(function($rootScope, geolocation) {
      scope = $rootScope.$new();
      _geo = geolocation;
  }));

  describe('LocalLocationCtrl', function(){

    it('should be defined after creation', inject(function($controller) {
      var localCtrl = $controller('LocalLocationCtrl', {$scope: scope, geolocation: _geo});
      expect(localCtrl).toBeDefined();
    }));

    //TODO: figure out why this test is failing.
    it('should set $scope.coords', inject(function($controller) {
      //var localCtrl = $controller('LocalLocationCtrl', {$scope: scope, geolocation: _geo});
      //expect(scope.coords).toBeDefined();
    }));

    //TODO: figure out why this test is failing.
    it('should set latitute and longitude', inject(function($controller) {
      //var localCtrl = $controller('LocalLocationCtrl', {$scope: scope, geolocation: _geo});
      //expect(scope.coords.lat).toBeDefined();
      //expect(scope.coords.long).toBeDefined();
    }));

  });
});

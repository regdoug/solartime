'use strict';

describe('myApp.solartime module', function() {
  var scope;

  beforeEach(module('myApp.solartime'));

  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
  }));

  describe('SolarTimeCtrl', function(){

    it('should be defined after creation', inject(function($controller) {
      var ctrl = $controller('SolarTimeCtrl', {$scope: scope});
      expect(ctrl).toBeDefined();
    }));

  });
});

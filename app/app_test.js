'use strict';

describe('myApp module', function() {

  beforeEach(module('myApp'));

  describe('main controller', function(){

    it('should exist', inject(function($rootScope,$controller) {
      var scope = $rootScope.$new();
      var ctrl = $controller('LocationCtrl', {"$scope": scope});
      expect(ctrl).toBeDefined();
    }));

    it('should have access to date-utils', function(){
        expect(Date.prototype.getOrdinalNumber).toBeTruthy();
    });

  });
});

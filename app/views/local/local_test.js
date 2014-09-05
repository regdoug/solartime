'use strict';

describe('myApp.local module', function() {

  beforeEach(module('myApp.local'));

  describe('local location controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var localCtrl = $controller('LocalLocationCtrl');
      expect(localCtrl).toBeDefined();
    }));

  });
});

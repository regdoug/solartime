'use strict';

describe('myApp.arbitrary module', function() {

  beforeEach(module('myApp.arbitrary'));

  describe('arbitrary location controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var arbitraryLocationCtrl = $controller('ArbitraryLocationCtrl');
      expect(arbitraryLocationCtrl).toBeDefined();
    }));

  });
});

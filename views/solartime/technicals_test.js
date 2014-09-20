"use strict";

describe("Technical information JSON file",function() {
    var _http;

    beforeEach(inject(function($http) {
        _http = $http;
    }));

    it('should load',function(done){
        _http('/views/solartime/technicals.json')
            .then(function(data) {
                expect(data).toBeDefined();
                done();
            });
    });

});

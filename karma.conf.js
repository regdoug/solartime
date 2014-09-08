module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angularjs-geolocation/src/geolocation.js',
      'app/bower_components/date-utils/lib/date-utils.js',
      'app/components/**/*.js',
      'app/views/**/*.js',
      'app/app*.js'
    ],

    preprocessors: {
      'app/app*.js': ['jshint'],
      'app/components/**/*.js': ['jshint'],
      'app/views/**/*.js': ['jshint']
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-jshint'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    jshint: {
      options: {
        browser: true,
        strict: true,
        globalstrict: true,
        predef: [ "angular", "describe", "beforeEach", "it", "module", "inject", "expect" ]
      }
    }

  });
};

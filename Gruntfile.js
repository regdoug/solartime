module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['app/bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'default'
        },
        files: {
          'app/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    },

    clean: ['../solartime-pages/'],

    copy: {
        main: {
            files: [
                {expand: true, cwd: 'app/', src: ['**','!**/*_test.js','!index-async.html'], dest: '../solartime-pages/'}
            ]
        }
    },
        
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('publish',['clean', 'copy']);
  grunt.registerTask('default', ['build','watch']);
}

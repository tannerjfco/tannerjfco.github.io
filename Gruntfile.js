module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      watch: {
          css: {
            files: '**/*.scss',
            tasks: ['sass']
          },
      },
      sass: {
          options: {
              outputStyle: 'compressed',
              includePaths: [ 'bower_components' ]
          },
          dist: {
              files: {
                  'stylesheets/style.css': 'sass/style.scss'
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass']);

};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
        all_src : {
            options : {
                sourceMap : true,
                sourceMapName : 'sourceMap.map'
            },
            files : {
                'js/bundle.min.js' : ['libs/underscore.js', '256/game.js']
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
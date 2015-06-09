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
                'js/256/bundle.min.js' : ['js/libs/underscore.js', 'js/256/game.js']
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
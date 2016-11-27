module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: false
            },
            angular-flex-picklist: {
                files: {
                    'release/angular-flex-picklist/angular-flex-picklist.min.js': ['src/angular-flex-picklist.js']
                }
            }
        },

        copy: {
            template: {
                src: ['src/angular-flex-picklist/angular-flex-picklist.html'],
                dest: 'release/angular-flex-picklist/',
            }
        },

        cssmin:{
            target:{
                files:[{
                    cwd: 'src/',
                    src:['angular-flex-picklist.css'],
                    dest: 'src/angular-flex-picklist/',
                    ext: '.min.css'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('start-app-release', ['uglify', 'copy', 'cssmin']);
}
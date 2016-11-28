module.exports = function (grunt) {


	grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ng-annotate'); 

    grunt.registerTask('default', ['jslint', 'ngAnnotate', 'uglify', 'copy', 'cssmin']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	
		jslint: {
			client: {
				src: 'src/angular-flex-picklist.js'
			}
		},
		
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'release/angular-flex-picklist.min.js': ['src/angular-flex-picklist.js'],
				}
			}
		},
	
        uglify: {
			options: {
				mangle: false,
				sourceMap: true,
				sourceMapName: 'release/angular-flex-picklist.map'
			},
            js: {
				src: ['release/angular-flex-picklist.min.js'],
				dest: 'release/angular-flex-picklist.min.js'
            }
        },

        copy: {
            template: {
				expand: true,
				cwd: 'src',
                src: 'angular-flex-picklist.html',
                dest: 'release/',
				filter: 'isFile'
            }
        },

        cssmin:{
            target:{
                files:[{
					expand:true,
                    cwd: 'src',
                    src:'angular-flex-picklist.css',
                    dest: 'release/',
                    ext: '.min.css'
                }]
            }
        },
    });
}
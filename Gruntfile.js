module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            dist: {
                src: [
                    'js/libs/*.js',
                    'js/*.js'

                ],
                dest: 'js/production/production.js'
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "css/main.css": "css/custom.less"
                    //"css/ie-prod.css": "css/ie8.less"
                }
            }
        },
        uglify: {
            build: {
                src: 'js/production/production.js',
                dest: 'js/production/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'img/'
                    }
                ]
            }
        },

        critical: {
            custom: {
                options: {
                    url: "http://localhost:63342/Project/",
                    width: 1200,
                    height: 950,
                    outputfile: "dist/critical.css",
                    filename: "css/main.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                    buffer: 800 * 1024,
                    ignoreConsole: false
                }
            }
        },

        watch: {
            less: {
                files: ['css/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },

            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['img/*.{png, jpg, gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-critical');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['concat', 'less', 'uglify', 'imagemin']);
// grunt.registerTask('default', ['concat', 'less', 'uglify', 'imagemin', 'critical']);
   // grunt.registerTask('default', ['watch']);
};
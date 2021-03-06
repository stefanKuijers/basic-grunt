module.exports = function( grunt ) {

    // load tasks from installed plugins
    require('load-grunt-tasks')(grunt);

    var configVars = {
        path: {
            src:   'src',
            dev:   'dev',
            dist:  'dist',
            bower: 'bower_components',
            npm:   'node_modules'
        },
        pkg: grunt.file.readJSON("package.json")
    };
    
    grunt.initConfig({

        // configuration of a task
        concat: {
            js:  {
                src:  ['vendor/js/**/*.js', 'src/js/**/*.js'],
                dest: 'dev/app.js'
            }
            // css: {
            //     src:  ['vendor/css/**/*.css', 'src/css/**/*.css'],
            //     dest: 'dev/app.css'
            // }
        },

        wiredep: {
            dev: {
                src: ['src/index.html'],
                ignorePath:  /\.\.\//
            }
        },

        removelogging: {
            dist: {
                src: "dev/**/*.js" // Each file will be overwritten with the output!
            }
        },

        sass: {                              
            dev: {                          
                options: {                   
                    style: 'expanded'
                },
                files: {                         
                    'dev/app.css': 'src/sass/app.scss',       
                }
            }
        },

        // configure custom task
        // homepage: {
        //     template: 'src/index.us',

        //     dev:      {
        //         dest:    'dev/index.html',
        //         context: {
        //             js:  'app.js',
        //             css: 'app.css'
        //         }
        //     }
        // },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['concat:js']
            },
            // css: {
            //     files: ['<%= concat.css.src %>'],
            //     tasks: ['concat:css'],
            //     options: {
            //       livereload: '<%= connect.options.livereload %>'
            //     }
            // },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            },
            html: {
                files: ['src/index.html'],
                tasks: ['copy:dev'],
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= concat.js.dest %>',
                    // '<%= concat.css.dest %>',
                    'src/sass/**/*.scss',
                    'src/index.html',
                    'Gruntfile.js',
                    'tasks/*.js'
                ]
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair'                : true,
                    'tagname-lowercase'       : true,
                    'attr-lowercase'          : true,
                    'attr-value-double-quotes': true,
                    'doctype-first'           : true,
                    'spec-char-escape'        : true,
                    'id-unique'               : true,
                    'head-script-disabled'    : true,
                    'style-disabled'          : true
                },
                src: ['dev/index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    // note that we do not have to create the folder js
                    // destination        source
                    'dist/js/app.min.js': ['dev/app.js']
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/output.min.css': ['dev/app.css']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.html'],
                    dest: 'dist/'
                }]
            }
        },

        connect: {
            options: {
                port      : 9000,
                base      : 'dev',
                hostname  : 'localhost',
                livereload: 9001
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },

        copy: {
            dev: {
                files: [ {expand: true, cwd: 'src/', src: ['*.html'], dest: 'dev/'} ],
            },
            dist: {
                files: [ {expand: true, cwd: 'dev/', src: ['*.html'], dest: 'dist/'} ],
            },
        },

        clean: {
            dev  : ["dev/"],
            dist : ["dist/"]
        }

    });

    // loading custom tasks
    // grunt.loadTasks("tasks");

    // Task set for everyday workflow
    // runs the dev tasks, setup a server and watches for any files to change
    // To run task set:
    // $ grunt
    grunt.registerTask("default", [
        "dev",              // development workflow 
        "connect",          // start webserver. Serving from dev/
        "watch"             // watch any files that might change
    ]);

    // Task set which will run often during development
    // cleans the dev dir, compiles sass to css, runs unit tests
    // To run task set:
    // $ grunt dev
    grunt.registerTask("dev", [
       
        "clean:dev",        // clean out the dev/ folder
        "sass:dev",         // compile sass to css,
        "concat",           // concatinate js to one file. guess it belongs in 
        "copy:dev"
        // "karma:dev",     // do unit testing
    ]);

    // Task set to get app ready for production
    // To run task set:
    // $ grunt dist
    grunt.registerTask("dist", [
        "dev",                // runs dev task set
        "removelogging:dist", // removes any console logs
        "clean:dist",         // empties the dist folder
        "uglify",             // minifies js
        "cssmin",             // minifies css
        "htmlmin:dist",       // minifies html
        "copy:dist"           // copies files from dev/ to dist/
    //     "karma:dist"       // runs unit tests to see or minification succeeded
    ]);
};
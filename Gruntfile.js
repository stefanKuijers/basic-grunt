module.exports = function( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // configuration of a task
        concat: {
            js: {
                src:  ['vendor/js/**/*.js', 'src/js/**/*.js'],
                dest: 'dev/app.js'
            },
            css: {
                src:  ['vendor/css/**/*.css', 'src/css/**/*.css'],
                dest: 'dev/app.css'
            }
        },

        // configure custom task
        homepage: {
            template: 'src/index.us',

            dev: {
                dest: 'dev/index.html',
                context: {
                    js:  'app.js',
                    css: 'app.css'
                }
            }
        },

        watch: {
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['concat:js']
            },
            css: {
                files: ['<%= concat.css.src %>'],
                tasks: ['concat:css']
            },
            homepage: {
                files: ['<%= homepage.template %>'],
                tasks: ['homepage:dev']
            }
        }

    });

    // loading tasks via npm
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // loading custom tasks
    grunt.loadTasks("tasks");

    // setup the workflow
    grunt.registerTask("default", ["concat", "homepage:dev", "watch"]);
};
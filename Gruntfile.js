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
        }

    });

    // loading tasks via npm
    grunt.loadNpmTasks("grunt-contrib-concat");

    // loading custom tasks
    grunt.loadTasks("tasks");

    // setup the workflow
    grunt.registerTask("default", ["concat", "homepage:dev"]);
};
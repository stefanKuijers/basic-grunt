module.exports = function( grunt ) {

    var _ = grunt.util._; // lowdash (optimized version of underscore library)

    grunt.registerTask("homepage", "wrapper which sets up the final build stuff index.html", function( target ) {
        var context, source, targetConfig;
        
        target = target || "dist";
        this.requiresConfig("homepage.template");
        this.requiresConfig("homepage." + target);

        targetConfig = grunt.config.get("homepage." + target );
        source       = grunt.file.read( grunt.config.get("homepage.template") );
        context      = _( grunt.config.get() ).extend( targetConfig.context );

        grunt.file.write( targetConfig.dest, _( source ).template( context ) );
        grunt.log.writeln( "Homepage HTML written '" + targetConfig.dest + "'" );
    });

};
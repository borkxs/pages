var server = require('../server');

module.exports = function(grunt) {

    var webPort = grunt.config.get("server.web.port") || 8000,
        webRoot = grunt.config.get("server.base") || "out",
        path = "" + (process.cwd()) + "/" + webRoot;

    grunt.registerTask("server", "static file development server", function() {

        server(webPort, webRoot, path, function(){
            grunt.log.writeln("Path: " + path);
            grunt.log.writeln("Starting express web server in \"" + webRoot + "\" on port " + webPort);
        });
    });
};
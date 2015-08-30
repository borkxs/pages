module.exports = function(grunt) {

    var connect = require("connect"),
        serverStatic = require("serve-static");

    grunt.registerTask("server", "static file development server", function() {

        var webPort = grunt.config.get("server.web.port") || 8000,
            webRoot = grunt.config.get("server.base") || "out",
            path = "" + (process.cwd()) + "/" + webRoot;

        var app = connect()
            .use(serverStatic(path))
            .listen(webPort, function(){
                grunt.log.writeln("Path: " + path);
                grunt.log.writeln("Starting express web server in \"" + webRoot + "\" on port " + webPort);
            });

        return app;
    });
};
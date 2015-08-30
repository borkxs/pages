module.exports = function(grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-open");

    grunt.initConfig({

        // App Structure
        files: {
            html: {
                src: "app/index.html",
                dst: "out/index.html"
            },
            css: {
                src: ["app/css/style.css"],
                dst: "out/css/screen.css"
            },
            js: {
                app: {
                    main: "app/js/progress.js",
                    src: ["app/js/*.js","app/js/**/*.js","app/js/templates/*.html"],
                    dst: "out/js/bundle.js"
                },
                test: {
                    src: ["test/spec/*.js","test/spec/**/*.js"],
                    dst: "test/spec.js",
                    runner: "test/_SpecRunner.html"
                }
            },
            json: {
                src: "app/data/books.json",
                dst: "out/data/books.json"
            }
        },

        // Tasks
        browserify: {
            app: {
                files: {
                    "<%= files.js.app.dst %>": "<%= files.js.app.main %>"
                },
                options: {
                    debug: true,
                    paths: ["./node_modules", "./script/app"],
                    transform: ['stringify']
                },
            }
        },

        //
        concat: {
            css: {
                files: {
                    "<%= files.css.dst %>": "<%= files.css.src %>"
                }
            }
        },
        copy: {
            html: {
                files: {
                    "<%= files.html.dst %>": "<%= files.html.src %>"
                }
            },
            json: {
                files: {
                    "<%= files.json.dst %>": "<%= files.json.src %>"
                }
            }
        },
        clean: {
            files: ["<%= files.js.test.dst %>"],
            workspaces: ["out"]
        },

        //
        server: {
            base: "<%= process.env.SERVER_BASE || 'out'%>",
            web: {
                port: 7860
            }
        },
        open: {
            dev: {
                path: "http://localhost:<%= server.web.port %>"
            }
        },

        //
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ["<%= files.html.src %>"],
                tasks: ["copy"]
            },
            css: {
                files: ["<%= files.css.src %>"],
                tasks: ["concat"]
            },
            app: {
                files: ["<%= files.js.app.src %>"],
                tasks: ["browserify:app"]
            }
        }
    });



    grunt.loadTasks("tasks");

    grunt.registerTask("default", ["clean", "copy", "concat", "browserify", "server", "open", "watch"]);

};
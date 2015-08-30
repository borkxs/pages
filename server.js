var connect = require('connect'),
    serverStatic = require('serve-static');

module.exports = function(webPort, webRoot, path, callback){

    var app = connect()
        .use(serverStatic(path))
        .listen(webPort, function(e){
            callback(e);
        });

};
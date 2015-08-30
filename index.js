var server = require('./server');

var port = 2860,
    rootDir = "build",
    path = "" + (process.cwd()) + "/" + rootDir;

server(port, rootDir, path, function(e){
    console.log('listening on ' + 2860);
});
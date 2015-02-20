var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    port = 8080;

gulp.task('default', ['serve']);

gulp.task('serve', function(done){
    var server = connect();

    server.use('/', serveStatic(__dirname));

    server.listen(port, function () {
        console.log('%s listening at %s', server.name, port);
        done();
    });
})

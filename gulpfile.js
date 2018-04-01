var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


gulp.task('live-server', function(){
    var server = new LiveServer('server/main.js');
    server.start();
})

gulp.task('bundle', function(){
    return browserify({
        entries: 'app/main.jsx',    //ALl the files in folders will be considered
        debug: true                 //to improve console input set debug flag to true 
    })                              //chaining browserify to reactify transform
    .transform(reactify)            //reactify transforms all the jsx to JS
    .bundle()                       //after transformation bundle tells us to output our file
    .pipe(source('app.js'))         //send the compile stuff to a new dir(.temp)
    .pipe(gulp.dest('./.temp'));    
})

gulp.task('serve',['live-server'], function(){
    browserSync.init(null, {
        proxy: "http://localhost:7777",     //where we are going to see our server
        port: 9001                          //new connection
    })
})



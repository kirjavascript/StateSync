var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var plumber = require('gulp-plumber');
var rimraf = require('rimraf');

var pimcore = "/var/www/html";

gulp.task('js', function() {
    return gulp.src(['js/*.js'])
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']})) // ES6
        .on('error', function(err){ console.log(err.message); })
        .pipe(uglify())
        .pipe(gulp.dest(pimcore+'/website/static/js/vendor'))
});

gulp.task('static', function() {
    return gulp.src(['src/**/*'])
        .pipe(gulp.dest(pimcore))
});

gulp.task('watch', ['static','js'], function() {
    gulp.watch(['src/**/*'], ['static']);
    gulp.watch(['js/**/*'], ['js']);
});

gulp.task('default', ['watch']);

gulp.task('install', ['static', 'js']);

gulp.task('clean', function() {
    rimraf(pimcore+'/website/static/js/vendor/statesync.js', function(){});
    rimraf(pimcore+'/website/views/helpers/StateSync.php', function(){});
    rimraf(pimcore+'/website/views/scripts/examples', function(){});
})
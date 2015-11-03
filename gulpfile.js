var gulp = require('gulp');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('scripts', function(){
  return browserify('./js/*.js')
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(gulp.dest('build/js'));
});


// Build task
gulp.task('build', ['scripts']);

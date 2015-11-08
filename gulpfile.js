var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('browserify');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'localscripts'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch(['js/*.js', 'js/**/*.js', 'js/**/**/*.js' ], ['localscripts']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('buildserve', function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});



//js linting
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//minify html
gulp.task('minifyhtml', function(){
  return gulp.src('index.html')
  .pipe(minifyHTML())
  .pipe(gulp.dest('build/'))
});

// sass
gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('build/css'));
});

//uglify scripts combines them
gulp.task('scripts', function() {
  return browserify(['js/main.js'])
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

gulp.task('localscripts', function() {
  return browserify(['js/main.js'])
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('js/browser'));
});

//default
gulp.task('default', ['jshint', 'scripts']);

// Build task
gulp.task('build', ['jshint','minifyhtml','scripts', 'sass']);

var gulp = require('gulp');
var compass = require('gulp-compass'),
  plumber = require('gulp-plumber');

// SASS/Compass compiler
gulp.task('sass', function(done) {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      css: 'css',
      config_file: 'sass/compass.rb'
    }));
});
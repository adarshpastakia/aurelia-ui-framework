var gulp = require('gulp');
var compass = require('gulp-compass'),
  plumber = require('gulp-plumber');
var del = require('del');
var distFolder = './demo';


gulp.task('clean-demo', function() {
  return del([distFolder + '/*', '!' + distFolder + '/CNAME'], {
    force: true
  });
});

gulp.task('dist-demo', function() {
  return gulp.src(['./index.html',
      './fonts/**/*', './css/**/*', './images{,/!(flags)}/*', './locales/**/*', './favicons/**/*', './scripts/**/*'
    ], {
      base: './'
    })
    .pipe(gulp.dest(distFolder));
});

gulp.task('production', gulp.series('clean-demo', 'sass', 'dist-demo',
  function(done) {
    done();
  }));
var gulp = require('gulp');

var bump = require('gulp-bump'),
  yargs = require('yargs');

var conventionalChangelog = require('gulp-conventional-changelog');

function getArgs() {
  var argv = yargs.argv,
    validBumpTypes = "major|minor|patch|prerelease|none".split("|"),
    bump = (argv.bump || 'none').toLowerCase();

  if (validBumpTypes.indexOf(bump) === -1) {
    throw new Error('Unrecognized bump "' + bump + '".');
  }
  return bump;
}

gulp.task('changelog', function(done) {
  if ((arg = getArgs()) != "none") {
    return gulp.src('./docs/CHANGELOG.md', {
        buffer: false
      }).pipe(conventionalChangelog({
        preset: 'angular'
      }))
      .pipe(gulp.dest('./docs'));
  } else {
    return done();
  }
});

gulp.task('bump-version', function(done) {
  if ((arg = getArgs()) != "none") {
    return gulp.src(['./package.json'])
      .pipe(bump({
        type: getArgs()
      })) //major|minor|patch|prerelease
      .pipe(gulp.dest('./'));
  } else {
    return done();
  }
});

gulp.task('release', gulp.series('build-source', 'bump-version', 'changelog', function(done) {
  done();
}));

var gulp = require('gulp');
var ts = require('gulp-typescript');
var assign = Object.assign || require('object.assign');
var del = require('del');
var rename = require('gulp-rename');
var vinylPaths = require('vinyl-paths');

var tsconfig = require('../tsconfig.json');
var compileToModules = ['es2015', 'commonjs', 'amd', 'system'];

var appRoot = 'src/resources/';
var paths = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  typings: appRoot + 'typings/**/*',
  output: 'dist/'
};

gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

function compilerTsOptions(override) {
  return assign(tsconfig.compilerOptions, {
    "target": override && override.target || "es5",
    "typescript": require('typescript')
  }, override || {});
}

compileToModules.forEach(function(moduleType) {
  gulp.task('build-ts-' + moduleType, function() {
    var tsProject = ts.createProject(
      compilerTsOptions({
        module: moduleType,
        target: moduleType == 'es2015' ? 'es2015' : 'es5'
      }), ts.reporter.defaultReporter());
    var tsResult = gulp.src(tsconfig.filesGlob, {
      base: appRoot
    }).pipe(ts(tsProject));
    return tsResult.js
      .pipe(gulp.dest(paths.output));
  });
});
gulp.task('build-dts', function() {
  var tsProject = ts.createProject(
    compilerTsOptions({
      removeComments: false,
      declaration: true,
      target: "es2015",
      module: "es2015"
    }), ts.reporter.defaultReporter());
  var tsResult = gulp.src(tsconfig.filesGlob, {
    base: appRoot
  }).pipe(ts(tsProject));
  return tsResult.dts.pipe(gulp.dest(paths.output + '/typings'));
});

gulp.task('copy-extras', function() {
  return gulp.src([paths.typings, paths.html], {
    base: appRoot
  }).pipe(gulp.dest(paths.output));
});


gulp.task('build-ts', gulp.series('clean', 'build-ts-amd', 'build-dts', 'copy-extras',
  function(done) {
    gulp.src(paths.output + 'index.js')
      .pipe(rename("sigma-ui-framework.js"))
      .pipe(gulp.dest("./dist"));
    gulp.src(paths.output + 'typings/index.d.ts')
      .pipe(rename("typings/sigma-ui-framework.d.ts"))
      .pipe(gulp.dest("./dist"));
    del([paths.output + 'index.js', paths.output + 'typings/index.d.ts']);
    done();
  }));
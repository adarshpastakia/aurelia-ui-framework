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
  glyphs: appRoot + 'ui-glyphs.html',
  libs: appRoot + 'libs/**/*',
  typings: appRoot + 'typings/**/*',
  output: 'dist/'
};

gulp.task('clean', function() {
  return gulp.src([paths.output + '*'])
    .pipe(vinylPaths(del));
});

function compilerTsOptions(override) {
  return assign(tsconfig.compilerOptions, {
    "target": override && override.target || "es5",
    "typescript": require('typescript')
  }, override || {});
}

compileToModules.forEach(function(moduleType) {
  gulp.task('build-ts-' + moduleType, function(done) {
    console.log('Compiling Typescript - ' + moduleType);
    var tsProject = ts.createProject(
      compilerTsOptions({
        module: moduleType,
        target: moduleType == 'es2015' ? 'es2015' : 'es5'
      }), ts.reporter.defaultReporter());
    var tsResult = gulp.src(tsconfig.filesGlob, {
      base: appRoot
    }).pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(paths.output + moduleType))
  });
});
gulp.task('build-dts', function(done) {
  console.log('Building Typescript Definitions');
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

gulp.task('rename-index', function(done) {
  compileToModules.forEach(function(moduleType) {
    gulp.src(paths.output + moduleType + '/index.js')
      .pipe(rename("aurelia-ui-framework.js"))
      .pipe(gulp.dest(paths.output + moduleType));
    del([paths.output + moduleType + '/index.js']);
  });
  gulp.src(paths.output + 'typings/index.d.ts')
    .pipe(rename("typings/aurelia-ui-framework.d.ts"))
    .pipe(gulp.dest(paths.output));
  del([paths.output + 'typings/index.d.ts']);
  done();
});

gulp.task('copy-extras', function(done) {
  compileToModules.forEach(function(moduleType) {
    gulp.src([paths.libs, paths.glyphs], {
      base: appRoot
    }).pipe(gulp.dest(paths.output + moduleType));
  });
  gulp.src([paths.typings], {
    base: appRoot
  }).pipe(gulp.dest(paths.output));
  done();
});


gulp.task('build-source', gulp.series('clean',
  compileToModules.map(function(moduleType) {
    return 'build-ts-' + moduleType
  }), 'build-dts', 'rename-index', 'copy-extras',
  function(done) {
    done();
  }));

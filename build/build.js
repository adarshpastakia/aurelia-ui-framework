var gulp = require('gulp');
var ts = require('gulp-typescript');
var assign = Object.assign || require('object.assign');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var sass = require('gulp-sass');

var tsconfig = require('../tsconfig.json');
var compileToModules = ['es2015', 'commonjs', 'amd', 'system'];

var appRoot = 'src/';
var paths = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  defs: 'node_modules/auf-libs/**/*.d.ts',
  output: 'dist/'
};

// SASS/Compass compiler
gulp.task('build-sass', function(done) {
  return gulp.src('sass/**/*.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./css'));
});

gulp.task('clean', function() {
  return gulp.src([paths.output + '*']).pipe(vinylPaths(del));
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
    var tsProject = ts.createProject(compilerTsOptions({
      module: moduleType,
      target: moduleType == 'es2015'
        ? 'es2015'
        : 'es5'
    }), ts.reporter.defaultReporter());
    var tsResult = gulp.src([
      paths.source, paths.defs
    ], {base: appRoot}).pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(paths.output + moduleType))
  });
});
gulp.task('build-dts', function(done) {
  console.log('Building Typescript Definitions');
  var tsProject = ts.createProject(compilerTsOptions({removeComments: false, declaration: true, target: "es2015", module: "es2015"}), ts.reporter.defaultReporter());
  var tsResult = gulp.src([
    paths.source, paths.defs
  ], {base: appRoot}).pipe(tsProject());
  return tsResult.dts.pipe(gulp.dest(paths.output + 'typings'));
});

gulp.task('build-source', gulp.series('clean', compileToModules.map(function(moduleType) {
  return 'build-ts-' + moduleType
}), 'build-dts', 'build-sass', function(done) {
  done();
}));

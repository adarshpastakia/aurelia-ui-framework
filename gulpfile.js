/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
const gulp = require("gulp");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");

const compileToModules = ["es2015", "commonjs", "amd", "system"];

var del = require("del");
var vinylPaths = require("vinyl-paths");

gulp.task("clean", () => {
  return gulp.src(["./css", "./dist"], { allowEmpty: true }).pipe(vinylPaths(del));
});

gulp.task("sass", () => {
  return gulp
    .src(["./sass/light-theme.scss", "./sass/dark-theme.scss", "./sass/flag-icons.scss"])
    .pipe(sass())
    .pipe(gulp.dest("./css"));
});

compileToModules.forEach(moduleType => {
  const dist = "./dist/" + moduleType;

  gulp.task("build-ts-" + moduleType, () => {
    const tsProject = ts.createProject("./tsconfig.build.json", {
      module: moduleType,
      target: moduleType == "es2015" ? "es2015" : "es5"
    });
    return gulp
      .src("./src/**/*.ts")
      .pipe(tsProject())
      .pipe(gulp.dest(dist))
      .on("end", () => {
        return gulp
          .src(["./src/**/*.html", "./src/**/*.js", "./src/**/*.json"])
          .pipe(gulp.dest("./dist/" + moduleType));
      });
  });
});

gulp.task("build-typings", () => {
  const tsProject = ts.createProject("./tsconfig.build.json", {
    declaration: true
  });
  return gulp
    .src("./src/**/*.ts")
    .pipe(tsProject())
    .dts.pipe(gulp.dest("./dist/typings"))
    .on("end", () => {
      return gulp.src("./src/**/*.d.ts").pipe(gulp.dest("./dist/typings"));
    });
});

gulp.task(
  "dist",
  gulp.series(
    "clean",
    "sass",
    ...compileToModules.map(function(moduleType) {
      return "build-ts-" + moduleType;
    }),
    "build-typings"
  )
);

const { series, crossEnv, concurrent, rimraf } = require("nps-utils");

module.exports = {
  scripts: {
    default: "nps webpack",
    test: {
      default: "nps test.jest",
      jest: {
        default: series(rimraf("test/coverage-jest"), "jest"),
        accept: "jest -u",
        watch: "jest --watch"
      },

      lint: {
        default: "eslint src",
        fix: "eslint src --fix"
      },
      all: concurrent({
        jest: "nps test.jest",
        lint: "nps test.lint"
      })
    },
    dist: {
      default: "nps dist.build",
      build: series(
        rimraf("dist/"),
        rimraf("typings/"),
        crossEnv(
          "copyfiles --up 1 src/**/*.html src/**/*.json src/**/*.js dist"
        ),
        crossEnv("copyfiles --up 1 src/**/*.d.ts typings"),
        crossEnv("tsc --project tsconfig.build.json --outDir dist --allowJs"),
        crossEnv(
          "tsc --project tsconfig.build.json --outDir typings --declaration --emitDeclarationOnly"
        )
      )
    },
    build: "nps webpack.build",
    webpack: {
      default: "nps webpack.server",
      build: {
        before: rimraf("dist"),
        default: "nps webpack.build.production",
        development: {
          default: series("nps webpack.build.before", "webpack --progress -d"),
          extractCss: series(
            "nps webpack.build.before",
            "webpack --progress -d --env.extractCss"
          ),
          serve: series.nps("webpack.build.development", "serve")
        },
        production: {
          inlineCss: series(
            "nps webpack.build.before",
            crossEnv(
              "NODE_ENV=production webpack --progress -p --env.production"
            )
          ),
          default: series(
            "nps webpack.build.before",
            crossEnv(
              "NODE_ENV=production webpack --progress -p --env.production --env.extractCss"
            )
          ),
          serve: series.nps("webpack.build.production", "serve")
        }
      },
      server: {
        default: `webpack-dev-server -d --devtool '#source-map' --inline --env.server`,
        extractCss: `webpack-dev-server -d --devtool '#source-map' --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --devtool '#source-map' --inline --hot --env.server`
      }
    },
    serve: "http-server dist --cors"
  }
};

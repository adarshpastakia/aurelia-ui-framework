import html from "rollup-plugin-html";
import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/aurelia-ui-framework.ts",
    output: [
      {
        file: "dist/es2015/aurelia-ui-framework.js",
        format: "esm",
        sourcemap: true
      },
      {
        file: "dist/umd-es2015/aurelia-ui-framework.js",
        format: "umd",
        name: "au.uiFramework",
        // defining where the namespace/path could be used to get the exports for Aurelia modules
        globals: {
          "aurelia-framework": "au",
          "aurelia-event-aggregator": "au",
          "aurelia-fetch-client": "au",
          "aurelia-logging": "au",
          "aurelia-router": "au",
          "aurelia-metadata": "au",
          "aurelia-ui-virtualization": "au.uiVirtualization",
          "aurelia-validation": "au.validation",
          // these are not exported in au namespace. date-fns would probably be dateFns? kramed would probably be kramed?
          // "resize-observer-polyfill": "au",
          // "date-fns": "au",
          // "kramed": "au",
          // "numeral": "au"
        },
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            removeComments: true
          }
        }
      })
    ]
  },
  {
    input: "src/aurelia-ui-framework.ts",
    output: {
      file: "dist/es2017/aurelia-ui-framework.js",
      format: "esm",
      sourcemap: true
    },
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            target: "es2017",
            removeComments: true
          }
        }
      })
    ]
  },
  {
    input: "src/aurelia-ui-framework.ts",
    output: [
      {
        file: "dist/amd/aurelia-ui-framework.js", format: "amd", id: "aurelia-ui-framework", sourcemap: true
      },
      {
        file: "dist/commonjs/aurelia-ui-framework.js", format: "cjs", sourcemap: true
      },
      {
        file: "dist/system/aurelia-ui-framework.js", format: "system", sourcemap: true
      },
      {
        file: "dist/native-modules/aurelia-ui-framework.js", format: "esm", sourcemap: true
      }
    ],
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            target: "es5",
            removeComments: true
          }
        }
      })
    ]
  },
  {
    input: "src/aurelia-ui-framework.ts",
    output: {
      file: "dist/umd/aurelia-ui-framework.js",
      format: "umd",
      name: "au.uiFramework",
      // defining where the namespace/path could be used to get the exports for Aurelia modules
      globals: {
        "aurelia-framework": "au",
        "aurelia-event-aggregator": "au",
        "aurelia-fetch-client": "au",
        "aurelia-logging": "au",
        "aurelia-router": "au",
        "aurelia-metadata": "au",
        "aurelia-ui-virtualization": "au.uiVirtualiztion",
        "aurelia-validation": "au.validation",
        // these are not exported in au namespace. date-fns would probably be dateFns? kramed would probably be kramed?
        // "resize-observer-polyfill": "au",
        // "date-fns": "au",
        // "kramed": "au",
        // "numeral": "au"
      },
      sourcemap: true
    },
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            target: "es5",
            removeComments: true
          }
        }
      })
    ]
  }
].map(config => {
  config.external = [
    "aurelia-framework",
    "aurelia-event-aggregator",
    "aurelia-fetch-client",
    "aurelia-logging",
    "aurelia-router",
    "aurelia-metadata",
    "resize-observer-polyfill",
    "aurelia-ui-virtualization",
    "aurelia-validation",
    "date-fns",
    "kramed",
    "numeral"
  ];
  return config;
});

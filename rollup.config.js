import html from "rollup-plugin-html";
import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/aurelia-ui-framework.ts",
    output: [
      {
        dir: "dist/es2015",
        format: "esm"
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
            target: "es2015",
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
        dir: "dist/es2017",
        format: "esm"
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
        dir: "dist/amd",
        format: "amd",
        id: "aurelia-ui-framework"
      },
      {
        dir: "dist/commonjs",
        format: "cjs"
      },
      {
        dir: "dist/system",
        format: "system"
      },
      {
        dir: "dist/native-modules",
        format: "esm"
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
    output: [
      {
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
          "aurelia-ui-virtualization": "au.uiVirtualization",
          "aurelia-validation": "au.validation",
          "resize-observer-polyfill": "ResizeObserver",
          "date-fns": "dateFns",
          kramed: "kramed",
          numeral: "numeral",
          "libphonenumber-js": "libphonenumberJs",
          "libphonenumber-js/examples.mobile.json": "examples"
        },
        esModule: false
      }
    ],
    inlineDynamicImports: true,
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            module: "esnext",
            outDir: undefined,
            target: "es5",
            declaration: false,
            removeComments: true
          },
          include: ["src"]
        }
      })
    ]
  },
  {
    input: "src/aurelia-ui-framework.ts",
    output: [
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
          "resize-observer-polyfill": "ResizeObserver",
          "date-fns": "dateFns",
          kramed: "kramed",
          numeral: "numeral",
          "libphonenumber-js": "libphonenumberJs",
          "libphonenumber-js/examples.mobile.json": "examples"
        },
        esModule: false
      }
    ],
    inlineDynamicImports: true,
    plugins: [
      json(),
      html({
        include: "src/**/*.html"
      }),
      typescript({
        cacheRoot: ".rollupcache",
        tsconfigOverride: {
          compilerOptions: {
            module: "esnext",
            outDir: undefined,
            target: "es2015",
            declaration: false,
            removeComments: true
          },
          include: ["src"]
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
    "numeral",
    "libphonenumber-js",
    "libphonenumber-js/examples.mobile.json"
  ];
  config.output.forEach(output => (output.sourcemap = true));
  config.output.forEach(output => (output.chunkFileNames = "[name].js"));
  return config;
});

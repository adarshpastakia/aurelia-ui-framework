1. ##### __Install NPM Modules__
  To get started we will need to install some global npm modules.

  ```shell
  # Use npm to install yarn package manager and aurelia-cli.

  npm install yarn aurelia-cli -g
  ```
2. ##### __Create an Aurelia application__

  ```shell
  # Create an application folder.
  # Within your application folder

  # Create a new aurelia application
  au new --here
  ```
3. ##### __Install the UI Framework__

  ```shell
  # Add the aurelia-ui-framework module.

  yarn add aurelia-ui-framework
  ```
4. ##### __Update the aurelia project__
  Update the `aurelia_project/aurelia.json` file to include the framework and its dependencies.

  Add the following code to the `bundles` array.

  ```json
  {
    "name": "framework-bundle.js",
    "dependencies": [
      "lodash",
      "moment",
      "numeral",
      "aurelia-animator-css",
      "aurelia-fetch-client",
      {
        "name": "auf-utility-library",
        "path": "../node_modules/auf-utility-library",
        "main": "index"
      },
      {
        "name": "aurelia-ui-framework",
        "path": "../node_modules/aurelia-ui-framework/dist/amd",
        "main": "aurelia-ui-framework"
      },
      {
        "name": "aurelia-validation",
        "path": "../node_modules/aurelia-validation/dist/amd",
        "main": "aurelia-validation"
      },
      {
        "name": "kramed",
        "path": "../node_modules/kramed/lib",
        "main": "kramed"
      }
    ]
  }
  ```

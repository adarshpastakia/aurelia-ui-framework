/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
import LOGO from "@images/logo.png";
import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { UIFrameworkConfig } from "aurelia-ui-framework";
import { App } from "./app";
import environment from "./environment";
import "./sass/main.scss";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-ui-virtualization"))
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-ui-framework"), (config: UIFrameworkConfig) => {
      config
        .setKeyValue("title", "Aurelia UI Framework")
        .setKeyValue("subtitle", "A bespoke UI Framework for business applications")
        .setKeyValue("logo", LOGO)
        .use.all();
    })
    .feature(PLATFORM.moduleName("resources/index"));

  // Uncomment the line below to enable animation.
  aurelia.use.plugin(PLATFORM.moduleName("aurelia-animator-css"));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  return aurelia
    .start()
    .then(() => aurelia.setRoot(App))
    .then(() => document.querySelector(".ui-splash").remove());
}

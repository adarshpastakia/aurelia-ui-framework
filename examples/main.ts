/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { App } from "examples/app";
import environment from "./environment";
import "./main.scss";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-ui-virtualization"))
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-ui-framework"))
    .feature(PLATFORM.moduleName("resources/index"));

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  return aurelia
    .start()
    .then(() => aurelia.setRoot(App))
    .then(() => document.querySelector(".ui-splash").remove());
}

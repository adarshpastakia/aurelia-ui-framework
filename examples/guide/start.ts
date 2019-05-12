/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class StartPage {
  protected install = `npm install aurelia-ui-framework@next --save`;

  protected configure = `import { PLATFORM } from "aurelia-pal";
import { UIFrameworkConfig, UIResources } from "aurelia-ui-framework";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-ui-framework"), (config: UIFrameworkConfig) => {
      config
        .setApiBaseUrl("/api")
        .setKeyValue("title", "Application Title")
        .useStandardResources();

      /**
       * Use specific components
       * config
       *  .useResource(UIResources.Buttons)
       *  .useResource(UIResources.Menus)
       **/
    });

  aurelia.start().then(a => a.setRoot());
}`;

  protected appHtml = `<template>
  <ui-viewport>
    <ui-viewport-header
      ui-padding="x--md" 
      ui-font="lg" 
      ui-bg="primary-dark" 
      ui-color="white">App Title</ui-viewport-header>

    <ui-router-view></ui-router-view>

    <ui-viewport-footer 
      ui-align="end" 
      ui-padding="x" 
      ui-color="gray" 
      ui-font="sm">Copyright © 2019</ui-viewport-footer>
  </ui-viewport>
</template>`;

  protected configProps = {
    title: "UIFrameworkConfig",
    methods: [
      {
        name: "setApiBaseUrl",
        params: "value: String",
        description: "Set base api url for HttpClient"
      },
      {
        name: "setApiHeaders",
        params: "value: KeyValue",
        description: "Set default api headers"
      },
      {
        name: "setKeyValue",
        params: "key: String, value: AnyObject",
        description: "Set Key/Value pair shareable throughout the application"
      }
    ]
  };
}

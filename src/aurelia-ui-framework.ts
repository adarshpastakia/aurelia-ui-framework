/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { Container, FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { registerValidators, UIValidationRenderer } from "./forms/ui-validation";
import "./libs/array";
import "./libs/phonelib";
import "./libs/string";
import "./libs/window";
import { UIAppConfig } from "./utils/ui-app-config";

export { getValidationController } from "./forms/ui-validation";
export { Countries } from "./libs/countries";
export { Currencies } from "./libs/currencies";
export { FileTypes } from "./libs/filetypes";
export * from "./model/ui-tree-model";
export * from "./services/ui-alert";
export * from "./services/ui-application";
export * from "./services/ui-dialog";
export * from "./utils/ui-format";
export * from "./utils/ui-http";

const AppConfig = () => {
  //
};
AppConfig.prototype.AppTitle = "Aurelia UI Framework";
AppConfig.prototype.AppSubtitle = "A UI Framework built for Aurelia+Webpack";
AppConfig.prototype.AppVersion = "5.0.0";
AppConfig.prototype.ApiBaseUrl = "";
AppConfig.prototype.ApiHeaders = "";

/**
 * UIFrameworkConfig
 * @description : Framework configurator
 * @function setTitle(v: string);
 * @function setSubtitle(v: string);
 * @function setVersion(v: string);
 * @function setApiBaseUrl(v: string);
 * @function setApiHeaders(v: string | KeyValue);
 */
export class UIFrameworkConfig {
  public use = {
    all: () => {
      return this.use
        .buttons()
        .forms()
        .menus()
        .data()
        .panels()
        .appbars();
    },

    buttons: () => {
      this.loadFromModule(PLATFORM.moduleName("./buttons/ui-button"));
      this.loadFromModule(PLATFORM.moduleName("./buttons/ui-button-group"));
      this.loadFromModule(PLATFORM.moduleName("./buttons/ui-badge"));
      this.loadFromModule(PLATFORM.moduleName("./attributes/ui-badge"));
      this.loadFromModule(PLATFORM.moduleName("./attributes/ui-tooltip"));
      return this.use;
    },

    forms: () => {
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-form"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-field"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-fieldset"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-input"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-textarea"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-select"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-list"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-checkbox"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-radio"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-toggle"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-phone"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-date"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-date-input"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-date-range"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-option-group"));
      this.loadFromModule(PLATFORM.moduleName("./forms/ui-input-addons"));
      return this.use;
    },

    panels: () => {
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-base"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-panel"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-card"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-tab-panel"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-card-body"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-alert"));
      this.loadFromModule(PLATFORM.moduleName("./panels/ui-dialog"));
      return this.use;
    },

    menus: () => {
      this.loadFromModule(PLATFORM.moduleName("./menu/ui-menu"));
      this.loadFromModule(PLATFORM.moduleName("./menu/ui-menubar"));
      this.loadFromModule(PLATFORM.moduleName("./menu/ui-dropdown"));
      return this.use;
    },

    data: () => {
      this.loadFromModule(PLATFORM.moduleName("./data/ui-tree-panel"));
      return this.use;
    },

    appbars: () => {
      this.loadFromModule(PLATFORM.moduleName("./appbars/ui-toolbar"));
      this.loadFromModule(PLATFORM.moduleName("./appbars/ui-sidebar"));
      this.loadFromModule(PLATFORM.moduleName("./appbars/ui-drawer"));
      return this.use;
    }
  };

  constructor(private auConfig: FrameworkConfiguration) {
    this.loadFromModule(PLATFORM.moduleName("./core/ui-viewport"));
    this.loadFromModule(PLATFORM.moduleName("./core/ui-responsive"));
    this.loadFromModule(PLATFORM.moduleName("./core/ui-page"));
    this.loadFromModule(PLATFORM.moduleName("./core/ui-icon"));
    this.loadFromModule(PLATFORM.moduleName("./core/ui-drop"));

    this.loadFromModule(PLATFORM.moduleName("./attributes/ui-helpers"));

    this.loadFromModule(PLATFORM.moduleName("./value-converters/ui-object"));
    this.loadFromModule(PLATFORM.moduleName("./value-converters/ui-text"));
  }

  public setTitle(v: string): UIFrameworkConfig {
    AppConfig.prototype.AppTitle = v;
    return this;
  }
  public setSubtitle(v: string): UIFrameworkConfig {
    AppConfig.prototype.AppSubtitle = v;
    return this;
  }
  public setVersion(v: string): UIFrameworkConfig {
    AppConfig.prototype.AppVersion = v;
    return this;
  }

  public setApiBaseUrl(v: string): UIFrameworkConfig {
    AppConfig.prototype.ApiBaseUrl = v;
    return this;
  }
  public setApiHeaders(v: string | KeyValue): UIFrameworkConfig {
    AppConfig.prototype.ApiHeaders = v;
    return this;
  }

  private loadFromModule(moduleName) {
    this.auConfig.globalResources(moduleName);
  }
}

export function configure(
  auConfig: FrameworkConfiguration,
  configCallback: (config: UIFrameworkConfig) => void
) {
  Container.instance = auConfig.container;

  auConfig.container.registerHandler("ui-validator", container =>
    container.get(UIValidationRenderer)
  );
  registerValidators(auConfig.container);

  const config = new UIFrameworkConfig(auConfig);
  if (isFunction(configCallback)) {
    configCallback(config);
  } else {
    config.use.all();
  }

  auConfig.singleton(UIAppConfig, AppConfig);
}

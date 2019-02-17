/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container, FrameworkConfiguration } from "aurelia-framework";
import AppBars from "./appbars";
import Helpers from "./attributes";
import Buttons from "./buttons";
import Core from "./core";
import Tree from "./data";
import Forms from "./forms";
import { registerValidators, UIValidationRenderer } from "./forms/ui-validation";
import "./libs/array";
import "./libs/phonelib";
import "./libs/string";
import "./libs/window";
import Lists from "./lists";
import Menus from "./menu";
import Panels from "./panels";
import { UIAppConfig } from "./utils/ui-app-config";
import ValueConverters from "./value-converters";

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
        .lists()
        .menus()
        .data()
        .panels()
        .appbars();
    },

    buttons: () => {
      this.loadFromModule(Buttons);
      return this.use;
    },

    forms: () => {
      this.loadFromModule(Forms);
      return this.use;
    },

    lists: () => {
      this.loadFromModule(Lists);
      return this.use;
    },

    panels: () => {
      this.loadFromModule(Panels);
      return this.use;
    },

    menus: () => {
      this.loadFromModule(Menus);
      return this.use;
    },

    data: () => {
      this.loadFromModule(Tree);
      return this.use;
    },

    appbars: () => {
      this.loadFromModule(AppBars);
      return this.use;
    }
  };

  constructor(private auConfig: FrameworkConfiguration) {
    this.loadFromModule(Core);
    this.loadFromModule(Helpers);
    this.loadFromModule(ValueConverters);
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
